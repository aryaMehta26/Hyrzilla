export const retryable = (status: number) => status === 408 || status === 409 || status === 429 || status >= 500;
export const retryDelaySeconds = (attempt: number) => Math.min(3600, 60 * 2 ** Math.max(0, attempt - 1));
export async function sendEmail(key: string, id: string, payload: unknown, send = fetch) {
  const response = await send('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Idempotency-Key': `inquiry/${id}` },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(15000),
  });
  const body = await response.json().catch(() => ({}));
  if (response.ok && typeof body.id === 'string') return { state: 'accepted', provider_id: body.id, last_error: null };
  return { state: response.ok || retryable(response.status) ? 'queued' : 'failed', last_error: `provider_http_${response.status}` };
}
