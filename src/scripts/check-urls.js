import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";
import sgMail from "@sendgrid/mail";
import { renderEmailTemplate } from "../components/EmailTemplate";

// Load environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM;

const missingEnvVars = [];
if (!SUPABASE_URL) missingEnvVars.push("SUPABASE_URL");
if (!SUPABASE_SERVICE_ROLE_KEY) missingEnvVars.push("SUPABASE_SERVICE_ROLE_KEY");
if (!SENDGRID_API_KEY) missingEnvVars.push("SENDGRID_API_KEY");
if (!EMAIL_FROM) missingEnvVars.push("EMAIL_FROM");

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required env variables: ${missingEnvVars.join(", ")}`);
}

// Init services
sgMail.setApiKey(SENDGRID_API_KEY);
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Send email using SendGrid
async function sendAlertEmail(to, siteName, url, status, httpStatus, loadTime, timestamp) {
  const html = renderEmailTemplate({
    siteName,
    url,
    status,
    httpStatus,
    loadTime,
    timestamp,
  });

  const msg = {
    to,
    from: EMAIL_FROM,
    subject: `⚠️ Alert: "${siteName}" is ${status}`,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error.response?.body || error.message);
  }
}

// Main function to check all monitored URLs
async function checkUrls() {
  const { data: urls, error } = await supabase.from("monitored_urls").select("*");

  if (error) {
    console.error("❌ Error fetching URLs:", error.message);
    return;
  }

  for (const item of urls) {
    const checkTime = new Date().toISOString();
    let status = "Down";
    let httpStatus = null;
    let loadTime = null;
    let responseSize = null;

    try {
      const start = Date.now();
      const response = await fetch(item.url, { method: "GET" });
      const end = Date.now();

      loadTime = end - start;
      httpStatus = response.status;
      const contentLength = response.headers.get("content-length");
      responseSize = contentLength ? parseInt(contentLength) : null;

      if (response.ok) {
        const body = await response.text();
        if (item.expected_content && !body.includes(item.expected_content)) {
          status = "Invalid Content";
        } else {
          status = "Up";
        }
      }
    } catch {
      console.log(`❌ ${item.url} is Down`);
    }

    const wasDown =
      item.status !== status &&
      (status === "Down" || status === "Invalid Content");

    const alreadyAlertedRecently =
      item.alert_sent_at &&
      item.last_down_at &&
      new Date(item.alert_sent_at).getTime() >= new Date(item.last_down_at).getTime();

    // Update URL record
    await supabase
      .from("monitored_urls")
      .update({
        status,
        http_status: httpStatus,
        load_time_ms: loadTime,
        response_size_bytes: responseSize,
        last_checked_at: checkTime,
        last_down_at: status === "Down" ? checkTime : item.last_down_at,
      })
      .eq("id", item.id);

    console.log(
      `🔎 ${item.url} → ${status}, HTTP: ${httpStatus || "n/a"}, Load: ${loadTime || "n/a"}ms`
    );

    if (
      wasDown &&
      !alreadyAlertedRecently &&
      item.user_id &&
      item.email_alerts_enabled
    ) {
      const { data: userData, error: userError } = await supabase.auth.admin.getUserById(item.user_id);

      if (userError || !userData?.user?.email) {
        console.error(`❌ Could not get user email for ${item.user_id}`);
        continue;
      }

      const userEmail = userData.user.email;

      await sendAlertEmail(
        userEmail,
        item.name || item.url,
        item.url,
        status,
        httpStatus,
        loadTime,
        new Date().toLocaleString()
      );

      await supabase
        .from("monitored_urls")
        .update({ alert_sent_at: new Date().toISOString() })
        .eq("id", item.id);
    }
  }
}

// Run the job
checkUrls();
