import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


console.log('Supabase URL:', supabaseUrl);
console.log('Supabase ANON KEY:', supabaseAnonKey);


if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables!');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
