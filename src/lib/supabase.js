import { createClient } from '@supabase/supabase-js';

// Supabase Configuration from Dashboard (aryaMehta26's Project)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://llbgtukjwtpaqgrulpdh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsYmd0dWtqd3RwYXFncnVscGRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MTY2MTksImV4cCI6MjA2Njk5MjYxOX0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
