-- Run AFTER deploying functions and setting their secrets.
-- In Supabase Vault create these two secrets using its UI:
-- inquiry_worker_url: https://libgtukjwtpaqgrulpdh.supabase.co/functions/v1/process-inquiry-emails
-- inquiry_worker_token: the SAME random token as Edge Function EMAIL_WORKER_TOKEN
-- Never commit or paste actual secrets into source control.
create extension if not exists pg_cron;
create extension if not exists pg_net with schema extensions;

do $$
begin
  if not exists (select 1 from vault.decrypted_secrets where name='inquiry_worker_url')
    or not exists (select 1 from vault.decrypted_secrets where name='inquiry_worker_token') then
    raise exception 'Configure inquiry_worker_url and inquiry_worker_token in Vault first';
  end if;
end;
$$;

select cron.schedule('hyrzilla-email-delivery', '* * * * *', $job$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name='inquiry_worker_url'),
    headers := jsonb_build_object('Content-Type','application/json','Authorization',
      'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name='inquiry_worker_token')),
    body := '{}'::jsonb, timeout_milliseconds := 90000
  );
$job$);
