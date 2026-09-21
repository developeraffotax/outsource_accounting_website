import { mailtransporter } from "@/lib/config/mail.config.js";

const sendAutoMail = async (data) => {
  try {
    const transporter = await mailtransporter();

    const mailSetup = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: "New Quote Request | Outsource Accounting",

      // Plain text fallback
      text: `
New Quote Request - Outsource Accounting

Name: ${data.name}
Company: ${data.company}
Turnover: ${data.companyTurnover}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}

Create lead in CRM:
https://crm.affotax.com/leads/create?name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}
      `.trim(),

      // Modern HTML version
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f2f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  
  <!-- Wrapper -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0f2f5; padding: 40px 16px;">
    <tr>
      <td align="center">
        
        <!-- Main Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 560px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600; letter-spacing: -0.3px;">
                New Quote Request
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">
                Outsource Accounting
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 40px 24px;">
              <p style="margin: 0 0 28px; color: #374151; font-size: 15px; line-height: 1.6;">
                A new customer has submitted a quote request. Here are the details:
              </p>

              <!-- Details Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding: 24px 28px;">
                    
                    <!-- Name -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 18px;">
                      <tr>
                        <td style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">
                          Name
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #0f172a; font-size: 16px; font-weight: 500;">
                          ${data.name}
                        </td>
                      </tr>
                    </table>

                    <!-- Company -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 18px;">
                      <tr>
                        <td style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">
                          Company
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #0f172a; font-size: 16px; font-weight: 500;">
                          ${data.company}
                        </td>
                      </tr>
                    </table>

                    <!-- Turnover -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 18px;">
                      <tr>
                        <td style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">
                          Turnover
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #0f172a; font-size: 16px; font-weight: 500;">
                          ${data.companyTurnover}
                        </td>
                      </tr>
                    </table>

                    <!-- Email -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 18px;">
                      <tr>
                        <td style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">
                          Email
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="mailto:${data.email}" style="color: #0d9488; font-size: 16px; font-weight: 500; text-decoration: none;">
                            ${data.email}
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Phone -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">
                          Phone
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="tel:${data.phone || ''}" style="color: #0d9488; font-size: 16px; font-weight: 500; text-decoration: none;">
                            ${data.phone || "Not provided"}
                          </a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table  role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="display: none !important; mso-hide: all; visibility: hidden; max-height: 0; overflow: hidden;">
                <tr>
                  <td align="center">
                    <a href="https://crm.affotax.com/leads/create?name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}"
                       target="_blank"
                       style="background-color: #ff7f45; color: #ffffff; text-decoration: none; padding: 12px 26px; border-radius: 10px; font-weight: bold; font-size: 15px; display: inline-block;">
                      Create lead in CRM
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 32px; text-align: center; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">
                This is an automated notification from Outsource Accounting.<br>
                Please respond to the customer promptly.
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