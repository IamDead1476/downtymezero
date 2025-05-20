import 'dotenv/config'; 
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';
import sgMail from '@sendgrid/mail';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM;

const missingEnvVars = [];

if (!SUPABASE_URL) missingEnvVars.push('SUPABASE_URL');
if (!SUPABASE_SERVICE_ROLE_KEY) missingEnvVars.push('SUPABASE_SERVICE_ROLE_KEY');
if (!SENDGRID_API_KEY) missingEnvVars.push('SENDGRID_API_KEY');
if (!EMAIL_FROM) missingEnvVars.push('EMAIL_FROM');

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variable(s): ${missingEnvVars.join(', ')}`);
}

sgMail.setApiKey(SENDGRID_API_KEY);
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function sendAlertEmail(to, siteName, url, status, httpStatus, loadTime) {
  const msg = {
    to,
    from: EMAIL_FROM,
    subject: `⚠️ Alert: "${siteName}" is ${status}`,
    html: `
      <p><strong>${siteName}</strong> (<a href="${url}">${url}</a>) is <strong>${status}</strong>.</p>
      <ul>
        <li><strong>HTTP Status:</strong> ${httpStatus}</li>
        <li><strong>Load Time:</strong> ${loadTime || 'N/A'} ms</li>
        <li><strong>Checked At:</strong> ${new Date().toLocaleString()}</li>
      </ul>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error('Failed to send email:', error.response?.body || error.message);
  }
}

async function checkUrls() {
  const { data: urls, error } = await supabase.from('monitored_urls').select(`
    *,
    user:users ( email ) -- assuming you have a FK relationship
  `);

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
        let body = await response.text();

        if (item.expected_content && !body.includes(item.expected_content)) {
          status = 'Invalid Content';
        } else {
          status = 'Up';
        }
      }

    } catch (err) {
      console.log(`❌ ${item.url} is Down`);
    }

    const wasDown = item.status !== status && (status === 'Down' || status === 'Invalid Content');

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

    //Send alert if status changed to Down or Invalid Content
    if (wasDown && item.user?.email) {
      await sendAlertEmail(
        item.user.email,
        item.name || item.url,
        item.url,
        status,
        httpStatus,
        loadTime
      );
    }
  }
}

checkUrls();
