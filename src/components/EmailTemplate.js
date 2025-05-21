import juice from 'juice';

export function renderEmailTemplate({ siteName, url, status, httpStatus, loadTime, timestamp }) {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Website Down Alert</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
          body {
              font-family: 'Inter', sans-serif;
              background-color: #EF4444;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              padding: 1rem;
              box-sizing: border-box;
          }
          .email-card {
              background-color: white;
              border-radius: 0.5rem;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                          0 10px 10px -5px rgba(0, 0, 0, 0.04);
              padding: 1.5rem;
              max-width: 28rem;
              width: 100%;
              margin: auto;
              border-top: 8px solid #DC2626;
          }
          .header-section {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 1.5rem;
          }
          .main-heading {
              font-size: 1.5rem;
              font-weight: 700;
              color: #1F2937;
          }
          .alert-icon {
              height: 2rem;
              width: 2rem;
              color: #DC2626;
          }
          .subject-line {
              font-size: 1.25rem;
              font-weight: 600;
              color: #B91C1C;
              margin-bottom: 1rem;
          }
          .email-body-text {
              color: #374151;
              margin-bottom: 1rem;
              line-height: 1.625;
          }
          .email-body-text.last-paragraph {
              margin-bottom: 1.5rem;
          }
          .highlight-text {
              font-weight: 600;
              color: #2563EB;
              text-decoration: none;
          }
          .info-box {
              background-color: #FEF2F2;
              padding: 1rem;
              border-radius: 0.375rem;
              font-size: 0.875rem;
              color: #991B1B;
              border: 1px solid #FECACA;
          }
          .info-box-title {
              font-weight: 500;
              margin-bottom: 0.5rem;
          }
          .info-box-list {
              list-style-type: disc;
              list-style-position: inside;
          }
          .info-box-list li + li {
              margin-top: 0.25rem;
          }
          .footer-text {
              color: #6B7280;
              font-size: 0.75rem;
              margin-top: 1.5rem;
              text-align: center;
          }
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

          <p class="email-body-text">Dear Team,</p>
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

  return juice(html); // Inline styles here
}
