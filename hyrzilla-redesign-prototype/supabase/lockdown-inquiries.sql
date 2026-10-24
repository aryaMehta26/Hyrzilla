-- Only run after production Edge Function, Turnstile and email tests pass.
-- Prevent direct browser writes from bypassing CAPTCHA and server validation.
begin;
revoke all on public.candidates_prod from anon, authenticated;
drop policy if exists "Public inquiry insert" on public.candidates_prod;
alter table public.candidates_prod enable row level security;
commit;
