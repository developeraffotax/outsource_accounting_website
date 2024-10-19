const nodemailer = require("nodemailer");

const sendMail = (name, phoneNumber, company, email, question) => {
	const promise = new Promise((resolve, reject) => {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_PASS,
			},
		});

		transporter.sendMail(
			{
				from: "info@affotax.com",
				to: "affotaxit2@gmail.com",
				subject: `Quote from The Outsource Accounting`,
				text: `
				Name: ${name}
				Email: ${email}
                Phone: ${phoneNumber}
				Company: ${company}
				Message:${question}
				`,
			},

			(error) => {
				if (!error) {
					resolve(true);
				} else {
					reject(false);
				}
			}
		);
	});

	return promise;
};

module.exports = sendMail;
