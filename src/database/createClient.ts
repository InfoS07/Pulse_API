import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

export default () => {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  if (!SUPABASE_URL) {
    throw new Error('You must provide a `SUPABASE_URL`');
  }
  if (!SUPABASE_ANON_KEY) {
    throw new Error('You must provide a `SUPABASE_ANON_KEY`');
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};
