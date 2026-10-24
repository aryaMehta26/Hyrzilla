-- Additive; does not revoke the current form's permissions during rollout.
create table public.inquiry_email_outbox (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references public.candidates_prod(id) on delete cascade,
  kind text not null check (kind in ('team', 'confirmation')),
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  state text not null default 'queued' check (state in ('queued','sending','accepted','failed','manual_review')),
  attempts integer not null default 0,
  first_attempt_at timestamptz,
  next_attempt_at timestamptz not null default now(),
  lease_until timestamptz,
  provider_id text unique,
  last_error text,
  delivery_status text,
  delivery_updated_at timestamptz,
  created_at timestamptz not null default now(),
  unique(inquiry_id, kind)
);
alter table public.inquiry_email_outbox enable row level security;
revoke all on public.inquiry_email_outbox from anon, authenticated;
grant all on public.inquiry_email_outbox to service_role;
create index inquiry_email_due on public.inquiry_email_outbox(next_attempt_at) where state in ('queued','sending');

create table public.inquiry_email_events (
  id text primary key,
  provider_id text not null,
  event_type text not null,
  occurred_at timestamptz not null,
  received_at timestamptz not null default now()
);
alter table public.inquiry_email_events enable row level security;
revoke all on public.inquiry_email_events from anon, authenticated;
grant all on public.inquiry_email_events to service_role;
create index inquiry_email_events_provider on public.inquiry_email_events(provider_id, occurred_at desc);

-- Store the inquiry and both email jobs in one transaction. Never save a lead
-- without its notifications, or enqueue email for an inquiry that wasn't saved.
create function public.enqueue_inquiry(p_inquiry jsonb, p_messages jsonb)
returns uuid language plpgsql security definer set search_path = '' as $$
declare inquiry_id uuid;
begin
  if jsonb_array_length(p_messages) <> 2 then raise exception 'invalid_messages'; end if;
  insert into public.candidates_prod(full_name,email,phone,selected_plan,tech_domain,experience_years,message,status,consent_at,consent_version)
  values (p_inquiry->>'full_name', lower(trim(p_inquiry->>'email')), p_inquiry->>'phone',p_inquiry->>'selected_plan',p_inquiry->>'tech_domain',p_inquiry->>'experience_years',p_inquiry->>'message',p_inquiry->>'status',now(),'2026-10-03')
  returning id into inquiry_id;
  insert into public.inquiry_email_outbox(inquiry_id,kind,payload)
  values (inquiry_id,'team',p_messages->0),(inquiry_id,'confirmation',p_messages->1);
  return inquiry_id;
end;
$$;
revoke all on function public.enqueue_inquiry(jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.enqueue_inquiry(jsonb,jsonb) to service_role;

-- One leased job per call; concurrent workers cannot claim the same job.
create function public.claim_inquiry_email()
returns setof public.inquiry_email_outbox language plpgsql security definer set search_path = '' as $$
begin
  update public.inquiry_email_outbox set state='manual_review',last_error='Retry window or attempts exhausted; verify provider before replay.'
  where state in ('queued','sending') and (lease_until is null or lease_until < now())
    and (attempts >= 8 or first_attempt_at < now() - interval '23 hours');
  return query
  with candidate as (
    select id from public.inquiry_email_outbox
    where state in ('queued','sending') and next_attempt_at <= now()
      and (lease_until is null or lease_until < now())
    order by next_attempt_at for update skip locked limit 1
  )
  update public.inquiry_email_outbox as job set state='sending', attempts=attempts+1,
    first_attempt_at=coalesce(first_attempt_at,now()),lease_until=now()+interval '2 minutes'
  from candidate where job.id=candidate.id returning job.*;
end;
$$;
revoke all on function public.claim_inquiry_email() from public,anon,authenticated;
grant execute on function public.claim_inquiry_email() to service_role;

create function public.reconcile_inquiry_email_events()
returns void language sql security definer set search_path = '' as $$
  update public.inquiry_email_outbox as job set
    delivery_status=latest.event_type,delivery_updated_at=latest.occurred_at
  from (
    select distinct on (provider_id) provider_id,event_type,occurred_at
    from public.inquiry_email_events
    order by provider_id, (event_type in ('email.bounced','email.complained','email.failed')) desc,occurred_at desc
  ) latest
  where job.provider_id=latest.provider_id;
$$;
revoke all on function public.reconcile_inquiry_email_events() from public,anon,authenticated;
grant execute on function public.reconcile_inquiry_email_events() to service_role;
