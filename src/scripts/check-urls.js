import 'dotenv/config'; 
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

// Load environment variables (for GitHub Action or local testing)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;// Use service key for update access


if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error('Missing Supabase env variables.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkUrls() {
  const { data: urls, error } = await supabase.from('monitored_urls').select('*');

  if (error) {
    console.error('Error fetching URLs:', error.message);
    return;
  }

  for (const item of urls) {
    try {
      const response = await fetch(item.url, { method: 'GET', timeout: 8000 });

      const status = response.ok ? 'Up' : 'Down';

      await supabase
        .from('monitored_urls')
        .update({ status })
        .eq('id', item.id);

      console.log(`✅ ${item.url} is ${status}`);
    } catch (err) {
      await supabase
        .from('monitored_urls')
        .update({ status: 'Down' })
        .eq('id', item.id);

      console.log(`❌ ${item.url} is Down`);
      console.log(`ERROR occured for URL: ${item.url}`, err);
    }
  }
}

checkUrls();
