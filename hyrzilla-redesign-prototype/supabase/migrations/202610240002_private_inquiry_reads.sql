-- The public form inserts without requesting returned rows. It never needs
-- permission to read other applicants' personal information.
revoke select on public.candidates_prod from public, anon, authenticated;
grant select on public.candidates_prod to service_role;
drop policy if exists "Allow public select from candidates_prod" on public.candidates_prod;
alter table public.candidates_prod enable row level security;
