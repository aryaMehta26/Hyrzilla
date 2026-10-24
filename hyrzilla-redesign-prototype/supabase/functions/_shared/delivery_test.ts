import { retryable, retryDelaySeconds, sendEmail } from './delivery.ts';
function equal(actual: unknown, expected: unknown) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}
Deno.test('temporary errors retry; invalid messages fail', () => {
  for (const status of [408,409,429,500,503]) equal(retryable(status), true);
  for (const status of [400,401,403,422]) equal(retryable(status), false);
  equal(retryDelaySeconds(1),60); equal(retryDelaySeconds(8),3600);
});
Deno.test('retries preserve payload and provider idempotency key', async () => {
  const sent: unknown[] = [];
  const fake = ((_url: unknown, init: RequestInit) => {
    sent.push({ key: new Headers(init.headers).get('Idempotency-Key'), body: init.body });
    return Promise.resolve(Response.json({ id: 'provider-id' }));
  }) as typeof fetch;
  const payload = { to: ['test@example.com'], subject: 'Test', html: 'Hello' };
  equal((await sendEmail('fake', 'job-123',payload,fake)).state,'accepted');
  await sendEmail('fake','job-123',payload,fake);
  equal(sent[0],sent[1]);
});
Deno.test('provider errors and malformed successful response never claim acceptance', async () => {
  for (const [status, expected] of [[429,'queued'],[503,'queued'],[422,'failed'],[200,'queued']] as const) {
    const fake = (() => Promise.resolve(Response.json({}, { status }))) as typeof fetch;
    equal((await sendEmail('fake','job-1',{},fake)).state,expected);
  }
});
