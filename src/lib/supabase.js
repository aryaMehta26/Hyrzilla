import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://llbgtukjwtpaqgrulpdh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_YUA4nnU1oexfNu2tLPzEjg_5s_8eXO7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
