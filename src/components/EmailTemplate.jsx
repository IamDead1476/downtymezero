export default function generateEmailTemplate({ siteName, url, status, httpStatus, loadTime, timestamp }) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Website Down Alert</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
          /* (Keep the same styles you provided — trimmed here for brevity) */
      </style>
  </head>
  <body>
      <div class="email-card">
          <div class="header-section">
              <h1 class="main-heading">Website Status Alert</h1>
              <svg xmlns="http://www.w3.org/2000/svg" class="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
          </div>

          <h2 class="subject-line">Urgent: Website Downtime Detected!</h2>

          <p class="email-body-text">
              Dear Team,
          </p>
          <p class="email-body-text">
              We are writing to inform you that our website, <span class="highlight-text">${siteName}</span>, is currently experiencing an outage.
          </p>
          <p class="email-body-text">
              The issue was detected at <span class="highlight-text">${timestamp}</span>. Our technical team is actively investigating the cause and working on a resolution.
          </p>
          <p class="email-body-text last-paragraph">
              <strong>URL:</strong> <a href="${url}" class="highlight-text">${url}</a><br/>
              <strong>Status:</strong> ${status}<br/>
              <strong>HTTP Status:</strong> ${httpStatus}<br/>
              <strong>Load Time:</strong> ${loadTime ?? "N/A"} ms
          </p>

          <div class="info-box">
              <p class="info-box-title">What to do:</p>
              <ul class="info-box-list">
                  <li>Do not attempt to deploy new changes.</li>
                  <li>Monitor this channel for further updates.</li>
                  <li>Contact IT support if you have critical information to share.</li>
              </ul>
          </div>

          <p class="footer-text">
              This is an automated alert. Please do not reply to this email.
          </p>
      </div>
  </body>
  </html>
  `;
}
