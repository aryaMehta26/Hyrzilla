-- Launch protection for the temporary direct-insert inquiry path.
-- It prevents repeat submissions from the same email for 24 hours, even if a
-- visitor bypasses the browser UI. It permits no read, update, or delete access.

create index if not exists candidates_prod_email_created_at_idx
  on public.candidates_prod (lower(email), created_at desc);

create or replace function public.enforce_inquiry_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (
    select 1
    from public.candidates_prod as prior
    where lower(prior.email) = lower(new.email)
      and prior.created_at >= now() - interval '24 hours'
  ) then
    raise exception 'inquiry_rate_limited'
      using errcode = 'P0001',
            hint = 'One inquiry per email is accepted every 24 hours.';
  end if;

  return new;
end;
$$;

drop trigger if exists candidates_prod_inquiry_rate_limit on public.candidates_prod;

create trigger candidates_prod_inquiry_rate_limit
before insert on public.candidates_prod
for each row
execute function public.enforce_inquiry_rate_limit();
