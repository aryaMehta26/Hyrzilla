import { verifyDeliveryEvent } from '../_shared/webhook.ts';
import { database } from '../_shared/server.ts';

Deno.serve(async (request) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const secret = Deno.env.get('RESEND_WEBHOOK_SECRET');
  if (!secret) return new Response('Webhook unavailable', { status: 503 });
  const raw = await request.text();
  if (raw.length > 65536) return new Response('Too large', { status: 413 });
  let event: { type: string; created_at: string; data: { email_id: string } };
  const id = request.headers.get('svix-id') || '';
  try {
    event = verifyDeliveryEvent(raw, request.headers, secret);
  } catch { return new Response('Invalid signature', { status: 401 }); }
  const supported = ['email.sent','email.delivered','email.delivery_delayed','email.bounced','email.complained','email.failed'];
  if (!supported.includes(event.type)) return Response.json({ ignored: true });
  if (!event.data?.email_id || !Number.isFinite(Date.parse(event.created_at))) return new Response('Invalid event', { status: 400 });
  try {
    const db = database();
    const { error } = await db.from('inquiry_email_events').upsert({ id, provider_id: event.data.email_id, event_type: event.type, occurred_at: event.created_at }, { onConflict: 'id', ignoreDuplicates: true });
    if (error) throw error;
    const result = await db.rpc('reconcile_inquiry_email_events');
    if (result.error) throw result.error;
    return Response.json({ ok: true });
  } catch { return new Response('Event not persisted', { status: 500 }); }
});
