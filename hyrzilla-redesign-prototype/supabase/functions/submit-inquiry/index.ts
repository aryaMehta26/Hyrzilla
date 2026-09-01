import { createClient } from 'npm:@supabase/supabase-js@2';

const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') || 'https://hyrzilla.com,https://www.hyrzilla.com,https://hyrzilla.vercel.app,http://localhost:4174')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsHeaders = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Vary': 'Origin',
});

const json = (body: Record<string, unknown>, status: number, origin: string | null) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
});

const text = (value: unknown, max = 4000) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

async function verifyTurnstile(token: string, remoteip: string | null) {
  const secret = Deno.env.get('TURNSTILE_SECRET_KEY');
  if (!secret) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (remoteip) body.append('remoteip', remoteip);
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const result = await response.json().catch(() => ({ success: false }));
  return response.ok && result.success === true;
}

Deno.serve(async (request) => {
  const origin = request.headers.get('origin');
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(origin) });
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, origin);
  if (!origin || !allowedOrigins.includes(origin)) return json({ error: 'Origin not allowed.' }, 403, origin);

  try {
    const body = await request.json();
    const source = body?.inquiry || {};
    if (text(body?.honeypot, 120)) return json({ ok: true }, 200, origin);

    const full_name = text(source.full_name, 120);
    const email = text(source.email, 254).toLowerCase();
    const phone = text(source.phone, 70);
    const selected_plan = text(source.selected_plan, 120);
    const tech_domain = text(source.tech_domain, 300);
    const experience_years = text(source.experience_years, 120);
    const message = text(source.message, 4000);
    const status = text(source.status, 80);

    if (!full_name || !validEmail(email) || !phone || !selected_plan || !tech_domain || !experience_years || !message || !status) {
      return json({ error: 'Please complete every required field.' }, 400, origin);
    }
    const turnstileOk = await verifyTurnstile(text(body?.turnstileToken, 4096), request.headers.get('cf-connecting-ip'));
    if (!turnstileOk) return json({ error: 'Security verification failed. Please try again.' }, 400, origin);

    const resendKey = Deno.env.get('RESEND_API_KEY');
    const notifyEmail = Deno.env.get('NOTIFY_EMAIL') || 'hyrzilla@gmail.com';
    const senderEmail = Deno.env.get('SENDER_EMAIL') || 'hello@hyrzilla.com';
    if (!resendKey) throw new Error('Email delivery is not configured.');

    const secretKeys = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') || '{}');
    const secretKey = secretKeys.default || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!secretKey) throw new Error('Supabase server key is not configured.');
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, secretKey);
    const inquiry = { full_name, email, phone, selected_plan, tech_domain, experience_years, message, status };

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: recentInquiries, error: lookupError } = await supabase
      .from('candidates_prod')
      .select('id')
      .eq('email', email)
      .gte('created_at', since)
      .limit(1);
    if (lookupError) throw lookupError;
    if (recentInquiries?.length) {
      return json({ error: 'We already have an inquiry from this email in the last 24 hours. Please wait for a reply before sending another.' }, 429, origin);
    }
    const { error: insertError } = await supabase.from('candidates_prod').insert([inquiry]);
    if (insertError) throw insertError;

    const safe = (value: string) => value.replace(/[&<>"']/g, (character) => {
      if (character === '&') return '&amp;';
      if (character === '<') return '&lt;';
      if (character === '>') return '&gt;';
      if (character === '"') return '&quot;';
      return '&#039;';
    });
    const category = status === 'Employer Inquiry' ? 'Employer role brief' : 'Professional inquiry';
    const messages = [
      {
        from: `Hyrzilla <${senderEmail}>`, to: [notifyEmail], reply_to: email,
        subject: `New Hyrzilla inquiry — ${category}`,
        html: `<h2>New Hyrzilla inquiry</h2><p><strong>Name:</strong> ${safe(full_name)}<br/><strong>Email:</strong> ${safe(email)}<br/><strong>Phone:</strong> ${safe(phone)}<br/><strong>Type:</strong> ${safe(category)}<br/><strong>Program:</strong> ${safe(selected_plan)}<br/><strong>Role / focus:</strong> ${safe(tech_domain)}<br/><strong>Location / experience:</strong> ${safe(experience_years)}</p><p><strong>Message</strong><br/>${safe(message).replace(/\n/g, '<br/>')}</p>`,
      },
      {
        from: `Hyrzilla <${senderEmail}>`, to: [email], reply_to: notifyEmail,
        subject: 'We received your Hyrzilla inquiry',
        html: `<p>Hi ${safe(full_name)},</p><p>Thank you for reaching out to Hyrzilla. We have received your ${safe(category.toLowerCase())} and a member of our team will reply within one business day.</p><p>We will confirm the appropriate scope and next steps before any work begins.</p><p>— Hyrzilla</p>`,
      },
    ];
    const results = await Promise.allSettled(messages.map((emailMessage) => fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(emailMessage),
    }))));
    const delivered = results.map((result) => result.status === 'fulfilled' && result.value.ok);
    if (!delivered[0]) console.error('The internal inquiry notification could not be delivered.');
    if (!delivered[1]) console.error('The applicant confirmation could not be delivered.');

    return json({ ok: true, confirmationSent: delivered[1] === true }, 200, origin);
  } catch (error) {
    console.error('submit-inquiry failed', error instanceof Error ? error.message : error);
    return json({ error: 'We could not send your inquiry. Please try again shortly.' }, 500, origin);
  }
});
