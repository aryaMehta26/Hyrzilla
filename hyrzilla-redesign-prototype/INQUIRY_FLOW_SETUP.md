# Hyrzilla inquiry flow setup

This project is ready for a secure inquiry path:

1. the contact form submits to a Supabase Edge Function;
2. the function validates Cloudflare Turnstile, stores the inquiry in `candidates_prod`, and sends two transactional emails through Resend;
3. Cloudflare Email Routing forwards `hello@hyrzilla.com` to `hyrzilla@gmail.com` for the team to read and reply to.

No secret belongs in Vercel or browser code.

Until the secure function is enabled, the site uses a temporary browser-to-database path so inquiries are not lost. That path stores leads but **cannot send email**. The final path below adds server-side spam controls and transactional email.

## 1. Free inbound email with Cloudflare

In Cloudflare, open **Email Service → Email Routing → Onboard domain** for `hyrzilla.com`.

Add `hyrzilla@gmail.com` as a destination address and complete the verification email in Gmail. Create these routing rules:

- `hello@hyrzilla.com` → `hyrzilla@gmail.com`
- `partners@hyrzilla.com` → `hyrzilla@gmail.com`
- `talent@hyrzilla.com` → `hyrzilla@gmail.com`

Keep catch-all disabled. Cloudflare adds its own MX and authentication records; do not remove the existing Vercel CNAME records.

## 2. Free confirmation emails with Resend

Create a Resend account, add `hyrzilla.com`, and add the exact DNS records Resend supplies in Cloudflare. Create an API key restricted to sending email. Resend's free transactional plan supports the low volume needed at launch.

## 3. Create a free Cloudflare Turnstile widget

Create a Turnstile widget for `hyrzilla.com` and `www.hyrzilla.com`. Save its **site key** and **secret key** separately.

## 4. Enable database-level duplicate protection now

Open **Supabase → SQL Editor**, create a query, paste the contents of
`supabase/migrations/202609010001_inquiry_rate_limit.sql`, and click **Run**.

This enforces one inquiry per email address every 24 hours at the database, so it also applies if someone bypasses the browser interface. The page also has a short local cooldown and a hidden bot-trap field. These are useful layers, but Turnstile in the final path is the protection against automated form traffic.

## 5. Deploy the Supabase Edge Function

From this project folder, authenticate the Supabase CLI and link project `libgtukjwtpaqgrulpdh`. Then set these Supabase Edge Function secrets:

```text
RESEND_API_KEY=<Resend secret key>
TURNSTILE_SECRET_KEY=<Cloudflare Turnstile secret key>
NOTIFY_EMAIL=hyrzilla@gmail.com
SENDER_EMAIL=hello@hyrzilla.com
ALLOWED_ORIGINS=https://hyrzilla.com,https://www.hyrzilla.com,https://hyrzilla.vercel.app
```

Deploy `submit-inquiry` with JWT verification disabled; the function performs its own origin and Turnstile checks.

## 6. Enable the live website after the function responds successfully

In Vercel, set these **Production** environment variables, then redeploy:

```text
VITE_HYRZILLA_CONTACT_EMAIL=hello@hyrzilla.com
VITE_TURNSTILE_SITE_KEY=<Cloudflare Turnstile site key>
VITE_INQUIRY_FUNCTION_ENABLED=true
```

The two `VITE_SUPABASE_*` variables must remain present. Never put Resend, Turnstile secret, or Supabase service-role keys in Vercel client variables.

## 7. Test

Submit one real test inquiry using an email that is not `hyrzilla@gmail.com`. Confirm all four outcomes:

1. one row appears in `candidates_prod`;
2. `hyrzilla@gmail.com` receives the team notification;
3. the submitter receives the Hyrzilla confirmation from `hello@hyrzilla.com`;
4. the Contact page shows its success state.

After this passes, remove browser-side anonymous insert access from `candidates_prod` so only the Edge Function can write leads:

```sql
drop policy if exists "Public inquiry insert" on public.candidates_prod;
revoke insert on table public.candidates_prod from anon;
```

Do this only after the Edge Function has passed the four checks above. It prevents a visitor from writing directly to the table and leaves the function plus Turnstile as the only submission path.
