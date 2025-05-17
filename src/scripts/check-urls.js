import 'dotenv/config'; 
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

// Load environment variables (for GitHub Action or local testing)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;// Use service key for update access

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase env variables.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function checkUrls() {
  const { data: urls, error } = await supabase.from('monitored_urls').select('*');

  if (error) {
    console.error('Error fetching URLs:', error.message);
    return;
  }

  for (const item of urls) {
    const checkTime = new Date().toISOString();
    let status = 'Down';
    let httpStatus = null;
    let loadTime = null;
    let responseSize = null;

    try {
      const start = Date.now();
      const response = await fetch(item.url, { method: 'GET' });
      const end = Date.now();

      loadTime = end - start;
      httpStatus = response.status;
      responseSize = parseInt(response.headers.get('content-length')) || null;

      if (response.ok) {
        status = 'Up';
      }

    } catch (err) {
      console.log(`❌ ${item.url} is Down`);
      console.log(`ERROR:`, err.message);
    }

    // Update monitored_urls with new metrics
    await supabase
      .from('monitored_urls')
      .update({
        status,
        http_status: httpStatus,
        load_time_ms: loadTime,
        response_size_bytes: responseSize,
        last_checked_at: checkTime,
        last_down_at: status === 'Down' ? checkTime : item.last_down_at,
      })
      .eq('id', item.id);

    console.log(`🔎 ${item.url} → ${status}, ${httpStatus || 'n/a'}, ${loadTime || 'n/a'}ms`);
  }
}

checkUrls();
