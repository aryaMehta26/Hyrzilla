import { database } from '../_shared/server.ts';
import { retryDelaySeconds, sendEmail } from '../_shared/delivery.ts';

Deno.serve(async (request) => {
  const secret = Deno.env.get('EMAIL_WORKER_TOKEN');
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) return new Response('Unauthorized', { status: 401 });
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const key = Deno.env.get('RESEND_API_KEY');
  if (!key) return new Response('Sender unavailable', { status: 503 });
  try {
    const db = database();
    let processed = 0;
    for (; processed < 5; processed++) {
      const { data, error } = await db.rpc('claim_inquiry_email');
      if (error) throw error;
      const job = data?.[0];
      if (!job) break;
      let outcome: Record<string, unknown>;
      try { outcome = await sendEmail(key, job.id, job.payload); }
      catch { outcome = { state: 'queued', last_error: 'provider_network_error' }; }
      const { error: saveError } = await db.from('inquiry_email_outbox').update({
        ...outcome, lease_until: null,
        next_attempt_at: new Date(Date.now() + retryDelaySeconds(job.attempts) * 1000).toISOString(),
      }).eq('id', job.id).eq('attempts', job.attempts).eq('state', 'sending');
      if (saveError) throw saveError; // Lease expiry retries using the same provider idempotency key.
    }
    const { error } = await db.rpc('reconcile_inquiry_email_events');
    if (error) throw error;
    return Response.json({ processed });
  } catch {
    console.error('Email worker failed; inspect queue and database logs.');
    return new Response('Worker failed', { status: 500 });
  }
});
