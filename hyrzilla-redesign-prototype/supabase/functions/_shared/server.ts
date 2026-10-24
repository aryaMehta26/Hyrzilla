import { createClient } from 'npm:@supabase/supabase-js@2';
export function database() {
  const keys = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') || '{}');
  const key = keys.default || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const url = Deno.env.get('SUPABASE_URL');
  if (!key || !url) throw new Error('Server database configuration missing');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
