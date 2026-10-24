import { Webhook } from 'npm:svix@1';
export function verifyDeliveryEvent(raw: string, headers: Headers, secret: string) {
  return new Webhook(secret).verify(raw, {
    'svix-id': headers.get('svix-id') || '',
    'svix-timestamp': headers.get('svix-timestamp') || '',
    'svix-signature': headers.get('svix-signature') || '',
  }) as { type: string; created_at: string; data: { email_id: string } };
}
