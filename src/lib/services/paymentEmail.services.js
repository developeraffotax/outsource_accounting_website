import { mailtransporter } from "@/lib/config/mail.config.js";

const formatAmount = (amountPence, currency) =>
  `${(amountPence / 100).toFixed(2)} ${currency?.toUpperCase()}`;

// Email to the customer confirming their payment
export const sendCustomerPaymentEmail = async ({
  customerEmail,
  amountTotal,
  currency,
  serviceName,
  receiptUrl,
}) => {
  try {
    const transporter = await mailtransporter();

    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.GMAIL_USER}>`,
      to: customerEmail,
      subject: "Payment Confirmed – Outsource Accounting",
      html: `
        <table style="width:100%;max-width:600px;margin:0 auto;border-collapse:collapse;font-family:Arial,sans-serif;">
          <tr>
            <td style="background-color:#1a56db;padding:24px;text-align:center;">
              <h1 style="color:#ffffff;font-size:22px;margin:0;">Payment Confirmed</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:30px;background-color:#ffffff;border:1px solid #dddddd;">
              <p style="font-size:16px;color:#555555;">Thank you for your payment. Here are your transaction details:</p>
              <table style="width:100%;border-collapse:collapse;margin-top:16px;">
                <tr style="border-bottom:1px solid #eeeeee;">
                  <td style="padding:10px 0;font-weight:bold;color:#333;">Service</td>
                  <td style="padding:10px 0;color:#555;text-align:right;">${serviceName}</td>
                </tr>
                <tr style="border-bottom:1px solid #eeeeee;">
                  <td style="padding:10px 0;font-weight:bold;color:#333;">Amount Paid</td>
                  <td style="padding:10px 0;color:#555;text-align:right;">${formatAmount(amountTotal, currency)}</td>
                </tr>
                <tr style="border-bottom:1px solid #eeeeee;">
                  <td style="padding:10px 0;font-weight:bold;color:#333;">Status</td>
                  <td style="padding:10px 0;text-align:right;">
                    <span style="background:#d1fae5;color:#065f46;padding:4px 10px;border-radius:20px;font-size:13px;">Paid</span>
                  </td>
                </tr>
                ${receiptUrl ? `
                <tr>
                  <td style="padding:10px 0;font-weight:bold;color:#333;">Receipt</td>
                  <td style="padding:10px 0;text-align:right;">
                    <a href="${receiptUrl}" style="color:#1a56db;">View Receipt</a>
                  </td>
                </tr>` : ""}
              </table>
              <p style="font-size:14px;color:#888;margin-top:24px;">
                If you have any questions, please contact us at
                <a href="mailto:${process.env.GMAIL_USER}" style="color:#1a56db;">${process.env.GMAIL_USER}</a>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f4f4f4;padding:16px;text-align:center;">
              <p style="font-size:12px;color:#999;margin:0;">&copy; ${new Date().getFullYear()} ${process.env.MAIL_FROM_NAME}. All rights reserved.</p>
            </td>
          </tr>
        </table>
      `,
    });

    console.log(`Customer payment email sent to ${customerEmail}`);
  } catch (err) {
    console.error("Failed to send customer payment email:", err);
  }
};

// Internal notification email to the admin/owner
export const sendAdminPaymentEmail = async ({
  customerEmail,
  amountTotal,
  currency,
  serviceName,
}) => {
  try {
    const transporter = await mailtransporter();

    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.GMAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: `New Payment Received – ${serviceName}`,
      html: `
        <table style="width:100%;max-width:600px;margin:0 auto;border-collapse:collapse;font-family:Arial,sans-serif;">
          <tr>
            <td style="background-color:#f4f4f4;padding:24px;text-align:center;">
              <h1 style="color:#333333;font-size:22px;margin:0;">New Payment Received</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:30px;background-color:#ffffff;border:1px solid #dddddd;">
              <p style="font-size:16px;color:#555555;">A customer has completed a payment:</p>
              <table style="width:100%;border-collapse:collapse;margin-top:16px;">
                <tr style="border-bottom:1px solid #eeeeee;">
                  <td style="padding:10px 0;font-weight:bold;color:#333;">Customer Email</td>
                  <td style="padding:10px 0;color:#555;text-align:right;">
                    <a href="mailto:${customerEmail}" style="color:#1a56db;">${customerEmail}</a>
                  </td>
                </tr>
                <tr style="border-bottom:1px solid #eeeeee;">
                  <td style="padding:10px 0;font-weight:bold;color:#333;">Service</td>
                  <td style="padding:10px 0;color:#555;text-align:right;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-weight:bold;color:#333;">Amount</td>
                  <td style="padding:10px 0;color:#555;text-align:right;">${formatAmount(amountTotal, currency)}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
    });

    console.log(`Admin payment notification sent to ${process.env.MAIL_TO}`);
  } catch (err) {
    console.error("Failed to send admin payment email:", err);
  }
};
