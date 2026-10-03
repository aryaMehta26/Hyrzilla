# Workspace integration and release status — 3 October 2026

The owner reports that Google Workspace aliases work. Keep Google's existing receiving MX and DKIM records; the earlier Cloudflare-to-personal-Gmail setup is superseded.

## Inquiry routing

Public email is hello@hyrzilla.com. Professional notifications go to candidates@hyrzilla.com; employer notifications go to employers@hyrzilla.com. These aliases should reach Dhruv's Workspace mailbox. Notification Reply-To is the visitor's email; confirmation Reply-To is the role alias. The primary dhruv@hyrzilla.com login is not published on the site.

## Required activation steps

1. Apply `supabase/migrations/202610030001_inquiry_consent.sql` to project libgtukjwtpaqgrulpdh. Existing records are preserved.
2. Configure the existing Resend integration with a verified Hyrzilla sender. Workspace handles human correspondence. Preserve Google's incoming MX records when adding provider-specific outbound authentication.
3. Configure Turnstile for www.hyrzilla.com and hyrzilla.com.
4. Set Supabase secrets RESEND_API_KEY, TURNSTILE_SECRET_KEY, SENDER_EMAIL=hello@hyrzilla.com and ALLOWED_ORIGINS=https://www.hyrzilla.com,https://hyrzilla.com. NOTIFY_EMAIL is superseded by audience-based routing. Server credentials stay in Supabase.
5. Deploy submit-inquiry using supabase/config.toml (JWT verification off; Turnstile and consent validation inside the function).
6. Enable Vercel VITE_TURNSTILE_SITE_KEY and VITE_INQUIRY_FUNCTION_ENABLED=true and redeploy. Retain Supabase URL/public key. Never expose server keys as VITE_ variables.
7. Verify clearly labelled professional and employer test inquiries: stored row, consent, notification inbox receipt, applicant confirmation, reply behavior, duplicate rejection, expired CAPTCHA and failure messaging.
8. Once verified, revoke INSERT from anon on candidates_prod and remove the Public inquiry insert policy; audit other public grants/policies to prevent bypassing the function.

Until activation, the temporary direct-database submission remains available. It does not send email or persist the new consent fields. Provider acceptance does not prove inbox delivery. Durable email retries and delivery-event tracking are still outstanding; do not claim these are complete.

## Search changes

Build emits HTML for nine public pages, two agreement framework pages and a 404 page. Each has initial content and metadata; agreement frameworks are noindex. Sitemap, canonical URLs and social images use www.hyrzilla.com. Navigation uses real links, with redirects for legacy candidates/hiring-teams routes. Vercel must use the repository build/output configuration. Verify direct-route responses and 404 status after deployment.

After production verification, an authorized owner must submit the sitemap in Google Search Console. Search indexing is not guaranteed.

## Pending owner input

- Exact approved US WhatsApp number; no personal number is inferred.
- Approval of prices, placement percentages, restart benefit and geography. Existing values are unchanged pending review. The one-business-day response promise is removed.
- Approved testimonials and reviewed legal text. No quotes are invented; existing legal frameworks remain labelled as drafts.
- Insight articles contain previews only; inactive Read note buttons are replaced with availability text until approved articles exist.
