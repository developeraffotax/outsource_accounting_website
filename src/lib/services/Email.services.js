import { mailtransporter } from "@/lib/config/mail.config.js";

const LOGO_URL =
  "https://outsourceaccountings.co.uk/_next/static/media/CompanyLogo.f3f9736c.svg";

// Escape user-supplied values before injecting them into the HTML template
const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sendAutoMail = async (data) => {
  try {
    const transporter = await mailtransporter();

    // Normalize fields – empty values become "N/A"
    const name = data.name || data.fullname || "N/A";
    const company = data.company || data.companyName || "N/A";
    const turnover = data.companyTurnover || data.turnover || "N/A";
    const serviceType = data.serviceType || "N/A";
    const email = data.email || "N/A";
    const phone = data.phone || "N/A";
    const message = String(data.message || data.comments || data.note || "").trim();

    const mailSetup = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: "New Quote Request | Outsource Accounting",

      // Plain text fallback
      text: `
New Quote Request - Outsource Accounting

Name: ${name}
Company: ${company}
Turnover: ${turnover}
Service Type: ${serviceType}
Email: ${email}
Phone: ${phone}
Message: ${message}

Create lead in CRM:
https://crm.affotax.com/leads/create?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}
      `.trim(),

      // Compact HTML version
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request</title>
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #F0F2F5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F0F2F5; padding: 24px 12px;">
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 520px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(70,50,218,0.12);">

         

          <!-- Header -->
          <tr>
            <td bgcolor="#4632DA" style="background-color: #4632DA; background: linear-gradient(135deg, #4632DA 0%, #6A57F0 100%); padding: 16px 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600; letter-spacing: -0.2px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                New Quote Request
              </h1>
              <p style="margin: 3px 0 0; color: rgba(255,255,255,0.85); font-size: 12px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                Outsource Accounting
              </p>
            </td>
          </tr>


          

          <!-- Body -->
          <tr>
            <td style="padding: 20px 24px 8px;">
              <p style="margin: 0 0 14px; color: #374151; font-size: 14px; line-height: 1.5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                A new customer has submitted a quote request:
              </p>

              <!-- Details Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F8FAFC; border-radius: 10px; border: 1px solid #e0dcfa;">
                <tr>
                  <td style="padding: 6px 18px;">

                    <!-- Name + Company (inline) -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #e6e3fb;">
                      <tr>
                        <td width="50%" valign="top" style="padding: 10px 8px 10px 0;">
                          <div style="color: #6B7280; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; padding-bottom: 2px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Name</div>
                          <div style="color: #1a1640; font-size: 15px; font-weight: 500; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${esc(name)}</div>
                        </td>
                        <td width="50%" valign="top" style="padding: 10px 0 10px 8px;">
                          <div style="color: #6B7280; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; padding-bottom: 2px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Company</div>
                          <div style="color: #1a1640; font-size: 15px; font-weight: 500; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${esc(company)}</div>
                        </td>
                      </tr>
                    </table>

                    <!-- Turnover + Service Type (inline) -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #e6e3fb;">
                      <tr>
                        <td width="50%" valign="top" style="padding: 10px 8px 10px 0;">
                          <div style="color: #6B7280; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; padding-bottom: 2px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Turnover</div>
                          <div style="color: #1a1640; font-size: 15px; font-weight: 500; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${esc(turnover)}</div>
                        </td>
                        <td width="50%" valign="top" style="padding: 10px 0 10px 8px;">
                          <div style="color: #6B7280; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; padding-bottom: 2px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Service Type</div>
                          <div style="color: #1a1640; font-size: 15px; font-weight: 500; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${esc(serviceType)}</div>
                        </td>
                      </tr>
                    </table>

                    <!-- Email -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #e6e3fb;">
                      <tr>
                        <td style="padding: 10px 0;">
                          <div style="color: #6B7280; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; padding-bottom: 2px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Email</div>
                          ${
                            email !== "N/A"
                              ? `<a href="mailto:${esc(email)}" style="color: #4632DA; font-size: 15px; font-weight: 500; text-decoration: none; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${esc(email)}</a>`
                              : `<span style="color: #1a1640; font-size: 15px; font-weight: 500; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">N/A</span>`
                          }
                        </td>
                      </tr>
                    </table>

                    <!-- Phone -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #e6e3fb;">
                      <tr>
                        <td style="padding: 10px 0;">
                          <div style="color: #6B7280; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; padding-bottom: 2px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Phone</div>
                          ${
                            phone !== "N/A"
                              ? `<a href="tel:${esc(phone)}" style="color: #4632DA; font-size: 15px; font-weight: 500; text-decoration: none; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${esc(phone)}</a>`
                              : `<span style="color: #1a1640; font-size: 15px; font-weight: 500; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">N/A</span>`
                          }
                        </td>
                      </tr>
                    </table>

                    <!-- Message -->
                    ${
                      message
                        ? `
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top: 1px solid #e6e3fb;">
                      <tr>
                        <td style="padding: 10px 0;">
                          <div style="color: #6B7280; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; padding-bottom: 2px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Message</div>
                          <div style="color: #1a1640; font-size: 14px; font-weight: 400; line-height: 1.5; white-space: pre-wrap; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${esc(message)}</div>
                        </td>
                      </tr>
                    </table>`
                        : ""
                    }
                  </td>
                </tr>
              </table>

              <!-- CTA Button (hidden for now – remove display:none styles if you want it visible) -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="display: none !important; mso-hide: all; visibility: hidden; max-height: 0; overflow: hidden;">
                <tr>
                  <td align="center" style="padding-top: 20px;">
                    <a href="https://crm.affotax.com/leads/create?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}"
                       target="_blank"
                       style="background-color: #4632DA; color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                      Create lead in CRM
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
           <!-- Logo -->
          <tr>
            <td align="center" style="background-color: #ffffff; padding: 24px 24px 2px;">
              <img src="${LOGO_URL}" alt="Outsource Accounting" height="36" style="display: block; height: 36px; width: auto; max-width: 200px; border: 0; outline: none; text-decoration: none; font-size: 15px; font-weight: 700; color: #4632DA;">
            </td>
          </tr>
          <tr>
            <td style="padding: 4px 24px 16px; text-align: center;">
              <p style="margin: 0; color: #8f8bb5; font-size: 11px; line-height: 1.5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                Sent from Outsource Accountings • outsourceaccountings.co.uk
              </p>
            </td>
          </tr>

        </table>
        <!-- End Main Card -->

      </td>
    </tr>
  </table>

</body>
</html>
      `,
    };

    const info = await transporter.sendMail(mailSetup);
    console.log("Message sent", info.messageId);
  } catch (err) {
    console.error("mail not sent", err);
    throw Object.assign(new Error("Failed to send contact email"), {
      statusCode: 502,
      code: "MAIL_DELIVERY_FAILED",
      cause: err,
    });
  }
};

export { sendAutoMail };