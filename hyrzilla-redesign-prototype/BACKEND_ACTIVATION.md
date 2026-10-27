# Backend activation — 24 October 2026

## Verified deployment progress — 24 October 2026

- Supabase CLI login confirmed; project `libgtukjwtpaqgrulpdh` is healthy and linked.
- All three functions deployed. Inquiry OPTIONS responds 200; invalid submissions are rejected; unauthenticated worker requests return 401. The webhook returns 503 until its signing secret is configured.
- Consent, duplicate-email protection, private email queue and delivery-event tables applied. Public SELECT access to candidate inquiries removed; server SELECT explicitly granted. Existing leads retained.
- Live transactional smoke test passed: normalized email, consent, two queued jobs and duplicate rejection. All synthetic test rows rolled back; no test emails sent.
- Sender address and production origin settings configured. Resend API key, Turnstile keys, webhook signing secret, worker token/schedule and Vercel protected-form activation remain pending. Google Search Console remains pending owner access.
- The existing direct-insert form is still enabled, now with database duplicate protection. It does **not** enqueue email; switching it requires the remaining credentials and end-to-end delivery checks.

The checklist below documents the complete rollout order; do not reapply already-recorded migrations. No success report should equate a Git push with Google indexing or inbox delivery.

## Account prerequisites

- Supabase access to project `libgtukjwtpaqgrulpdh`, via the connected Supabase integration or `npx supabase login` in the owner's terminal.
- Resend account with verified Hyrzilla sending domain and a sending API key. Preserve Google's incoming mail MX/DKIM setup.
- Cloudflare access to create a production Turnstile widget for `hyrzilla.com` and `www.hyrzilla.com`.
- Vercel project access to set public flags; Google Search Console owner/full-user access for the site.

## Activate in this order

1. Inspect existing database schema, permissions and applied migrations. Apply the consent migration `202610030001_inquiry_consent.sql`, then `202610240001_email_outbox.sql`. These preserve leads and do not revoke the current form's access.
2. Store secrets in Supabase Edge Function settings: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `SENDER_EMAIL=hello@hyrzilla.com`, `ALLOWED_ORIGINS=https://www.hyrzilla.com,https://hyrzilla.com`, and a randomly generated `EMAIL_WORKER_TOKEN`. Do not send secrets in chat or commit them. Supabase supplies the server database credentials.
3. From this directory deploy all three functions with project ref libgtukjwtpaqgrulpdh: `submit-inquiry`, `process-inquiry-emails`, `email-delivery-webhook`. Use `npx supabase functions deploy <name> --project-ref libgtukjwtpaqgrulpdh --no-verify-jwt`. Each function implements its own required verification (Turnstile, worker bearer token, signed webhook respectively).
4. Add Resend webhook URL `https://libgtukjwtpaqgrulpdh.supabase.co/functions/v1/email-delivery-webhook`, selecting sent, delivered, delivery_delayed, bounced, complained and failed. Store its signing secret as `RESEND_WEBHOOK_SECRET` in Supabase.
5. In Supabase Vault store `inquiry_worker_url` as the process-inquiry-emails URL and `inquiry_worker_token` matching EMAIL_WORKER_TOKEN. Run `supabase/activate-email-worker.sql`. This schedules five jobs per minute; worker leases support safe overlap.
6. Set Vercel production `VITE_TURNSTILE_SITE_KEY` and `VITE_INQUIRY_FUNCTION_ENABLED=true`; redeploy. Do not enable before backend/scheduler checks pass.
7. Submit clearly labelled test inquiries for both audiences. Confirm one saved inquiry, consent timestamp/version, exactly two outbox jobs, correct candidate/employer alias, applicant confirmation and Reply-To. Confirm inbox receipt with Dhruv. Verify repeated emails and invalid CAPTCHA fail. Remove only identified test records after owner review (deleting a test lead cascades its outbox rows).
8. Run `supabase/lockdown-inquiries.sql` after secure flow verification; then test that direct anon/authenticated writes fail and Edge Function submissions still work. Retain actual inquiries. Do not re-enable direct public inserts during ordinary email outages; the queue preserves messages.

## Delivery operations

`inquiry_email_outbox` is server-only. `queued`/`sending`/`accepted` describe transport state; `delivery_status` comes from verified events, so provider acceptance is never labelled inbox delivery. Failed events arriving before acceptance are stored and reconciled on the next worker run. Bounce/complaint/failure events take precedence over delivery events.

Retry transient HTTP 408/409/429/5xx and network timeouts with 1-minute exponential backoff capped at 1 hour. Stable per-job Resend idempotency keys prevent duplicate sends after a timeout or database-save failure. Attempts stop at 8 or 23 hours from first send, before Resend's 24-hour deduplication window expires. Expired jobs require manual review; never blindly resend after the window. Permanent 4xx failures are marked failed. Check failed/manual_review rows and bounce/complaint events in Supabase daily; these need an operator to resolve sender configuration or bad addresses.

Useful query: `select id,kind,state,attempts,last_error,delivery_status from public.inquiry_email_outbox where state in ('failed','manual_review') or delivery_status in ('email.bounced','email.complained','email.failed');`

## Google Search Console

### Confirmed through owner screenshots, 26 October 2026

- Domain ownership verified; retain the verification DNS record.
- Sitemap submitted successfully, with nine discovered URLs.
- Homepage and `/professionals` reported indexed.
- `/employers` reported discovered but not indexed; live test passed and indexing was requested.
- Homepage recrawl requested after the service-copy update.
- Three excluded URLs are HTTP/non-www homepage alternatives. Live tests confirmed permanent redirects to the working HTTPS www homepage. Keep these redirects.
- Branded query still showed Google's correction to “Hydrilla” in the owner's screenshot. First-place branded ranking and resolution of that correction are **not achieved or verified**.

The public Hyrzilla LinkedIn page was checked and already links to the canonical website. Website updates add explicit site-name metadata, a domain-name fallback, the existing H logo in organization markup, linked page/organization identity, and factual service details on About. These communicate identity; they do not guarantee ranking or control Google's spelling interpretation.

Next measurement: in Search Console Performance, filter the exact query `hyrzilla` and review impressions, clicks, position, and landing page with country/device context. Compare over time rather than repeatedly requesting indexing. Check the crawl date/content before assuming new website changes have been processed. The Google-indexed status of the remaining sitemap pages still needs verification.

With an owner-authorized OAuth token securely set in GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN (webmasters scope), `npm run search:submit` submits the sitemap and inspects index status; `npm run search:status` is read-only. This script does not verify ownership or request live URL indexing; do those through Search Console. Do not use Google's JobPosting Indexing API for these marketing pages.

## Repeatable local checks

- `npm run test:outbox`: isolated PostgreSQL-compatible database tests, never production.
- `npm run test:email`: provider retry/idempotency tests and signed-webhook rejection tests; no email is sent.
- `npm run build`: all twelve routes prerender successfully.
- Deno check all three function entrypoints before deployment.

Local tests cannot establish production schema compatibility, DNS verification, cron execution, inbox delivery, or Google ownership. Check these with the connected accounts before declaring activation complete.
