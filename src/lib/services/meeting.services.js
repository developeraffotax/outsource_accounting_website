import { mailtransporter } from "../config/mail.config";
import { parse } from "date-fns";

const meetingService = async ({ date, time, Name, email }) => {
  try {
    const transporter = await mailtransporter();

    console.log("Meeting Service Data:", { date, time, Name, email });
    const parsedDate = parse(date, "PPP", new Date());

    const hour = Number(time);
    if (Number.isNaN(hour) || hour < 0 || hour > 23) {
      throw new Error("Invalid hour");
    }

    parsedDate.setHours(hour, 0, 0, 0);
    const meetingUTC = parsedDate;

    console.log("UTC Meeting Hour:", meetingUTC);

    const adminMailSetup = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.GMAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: "New Meeting Scheduled",
      text: `New Meeting Scheduled! Name: ${Name}, Date: ${date}, Time: ${time}`,
      html: `
    <table style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
        <tr>
            <td style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                <h1 style="color: #333333; font-size: 24px;">🎉 New Meeting Alert!</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px; background-color: #ffffff; border: 1px solid #dddddd;">
                <p style="font-size: 16px; color: #555555; margin-bottom: 15px;">
                    A new meeting has been scheduled with the following details:
                </p>
                <ul style="list-style: none; padding: 0;">

                    <li style="margin-bottom: 10px;">
                        <strong>Name:</strong>
                        <span style="color: #007bff;">${Name}</span>
                    </li>

                    <li style="margin-bottom: 10px;">
                        <strong>Email:</strong>
                       ${email}
                    </li>

                    <li style="margin-bottom: 10px;">
                        <strong>Date:</strong> ${date}
                    </li>

                    <li style="margin-bottom: 10px;">
                        <strong>Time:</strong> ${time}
                    </li>

                    <li style="margin-bottom: 10px;">
                        <strong>Date (UTC):</strong>
                        <span>${meetingUTC.toISOString()}</span>
                    </li>

                    <li style="margin-bottom: 10px;">
                        <strong>Date (PKT):</strong>
                        <span>
                            ${meetingUTC.toLocaleString("en-PK", {
                              timeZone: "Asia/Karachi",
                              hour: "2-digit",
                              hour12: true,
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                        </span>
                    </li>


                </ul>
            </td>
        </tr>
    </table>
  `,
    };

    const customerMailSetup = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Meeting Confirmation",
      text: `Your meeting has been confirmed! Name: ${Name}, Date: ${date}, Time: ${time}`,
      html: `
    <table style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
        <tr>
            <td style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                <h1 style="color: #333333; font-size: 24px;">✅ Meeting Confirmation</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px; background-color: #ffffff; border: 1px solid #dddddd;">
                <p style="font-size: 16px; color: #555555; margin-bottom: 15px;">
                    Your meeting has been confirmed with the following details:
                </p>
                <ul style="list-style: none; padding: 0;">

                    <li style="margin-bottom: 10px;">
                        <strong>Name:</strong>
                        <span style="color: #007bff;">${Name}</span>
                    </li>

                    <li style="margin-bottom: 10px;">
                        <strong>Date:</strong> ${date}
                    </li>

                    <li style="margin-bottom: 10px;">
                        <strong>Time:</strong> ${time}
                    </li>

                </ul>
                <p style="font-size: 14px; color: #777777; margin-top: 20px;">
                    We look forward to meeting with you!
                </p>
            </td>
        </tr>
    </table>
  `,
    };

    const sendAdminMail = await transporter.sendMail(adminMailSetup);
    console.log("Admin notification sent", sendAdminMail.messageId);

    const sendCustomerMail = await transporter.sendMail(customerMailSetup);
    console.log("Customer confirmation sent", sendCustomerMail.messageId);

    return {
      success: true,
      adminMessageId: sendAdminMail.messageId,
      customerMessageId: sendCustomerMail.messageId,
    };
  } catch (error) {
    console.error("Meeting service mail not sent", error);
    throw error;
  }
};

export default meetingService;
