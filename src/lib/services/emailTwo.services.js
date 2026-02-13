import { mailtransporter } from "@/lib/config/mail.config.js";
import nodemailer from "nodemailer";

const sendAutoMailTwo = async (data) => {
  try {
    //get configure transporter
    const transporter = await mailtransporter();

    //extract data
    // const data = req.body;

    //configure email

    const mailSetup = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: "New Quote | Outsource Accounting",

      text: `New Customer Alert! Name: ${data.companyName} ...`,

      // USE THE 'html' PROPERTY FOR STYLING
      html: `
        <table style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
            <tr>
                <td style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                    <h1 style="color: #333333; font-size: 24px;">🎉 New Customer Alert! Name:${data.companyName}</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 30px; background-color: #ffffff; border: 1px solid #dddddd;">
                    <p style="font-size: 16px; color: #555555; margin-bottom: 15px;">
                        A new customer has registered with the following details:
                    </p>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 10px;">
                            <strong>Name:</strong> <span style="color: #007bff;">${data.fullname}</span>
                        </li>
                        <li style="margin-bottom: 10px;">
                            <strong>Company:</strong> ${data.companyName}
                        </li>
                        <li style="margin-bottom: 10px;">
                            <strong>Turnover:</strong> ${data.serviceType}
                        </li>
                        <li style="margin-bottom: 10px;">
                            <strong>Contact:</strong> <a href="mailto:${data.email}" style="color: #17a2b8; text-decoration: none;">${data.email}</a>
                        </li>
                         
                    </ul>
                </td>
            </tr>
        </table>
    `,
    };

    //send email
    const info = await transporter.sendMail(mailSetup);

    console.log("Message sent", info.messageId);

    console.log("preview mail", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("mail not sent", err);
  }
};

export { sendAutoMailTwo };
