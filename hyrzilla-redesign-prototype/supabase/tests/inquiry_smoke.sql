-- Runs against the deployed schema, leaves no test leads or email jobs.
begin;
set local role service_role;
do $$
declare
  test_email text := 'deployment-check-' || gen_random_uuid()::text || '@example.invalid';
  lead uuid;
  duplicate_blocked boolean := false;
  payload jsonb;
begin
  if has_table_privilege('anon','public.candidates_prod','SELECT') then
    raise exception 'Public inquiry reads still allowed';
  end if;
  if has_function_privilege('anon','public.enqueue_inquiry(jsonb,jsonb)','EXECUTE') then
    raise exception 'Public queue execution still allowed';
  end if;
  payload := jsonb_build_object('full_name','Transactional deployment check','email',upper(test_email),
    'phone','0000000000','selected_plan','Test','tech_domain','Test',
    'experience_years','1','message','Rolled back; no email sent','status','Professional Inquiry');
  lead := public.enqueue_inquiry(payload,'[{"test":true},{"test":true}]'::jsonb);
  if (select count(*) from public.inquiry_email_outbox where inquiry_id=lead) <> 2 then
    raise exception 'Expected exactly two email jobs';
  end if;
  if not exists(select 1 from public.candidates_prod where id=lead and email=test_email
    and consent_at is not null and consent_version='2026-10-03') then
    raise exception 'Normalization or consent missing';
  end if;
  begin
    perform public.enqueue_inquiry(payload,'[{"test":true},{"test":true}]'::jsonb);
  exception when raise_exception then
    if sqlerrm='inquiry_rate_limited' then duplicate_blocked:=true; else raise; end if;
  end;
  if not duplicate_blocked then raise exception 'Duplicate inquiry allowed'; end if;
end;
$$;
rollback;
select 'PASS: queue, consent, normalization, duplicate limit, access checks; test data rolled back' as result;
