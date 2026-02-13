//import
import nodemailer from "nodemailer";
// import google from "googleapis"; //app crashes
// import * as google from "googleapis"; //still app crashes
import * as googleapisModule from "googleapis";

// Access the nested 'google' property, which holds the auth object
const google = googleapisModule.google;

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URIs = process.env.GMAIL_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  throw new Error("ERROR: Missing critical Gmail OAuth environment variables!");
}

const Oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URIs
);
Oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const mailtransporter = async () => {
  const accessTokenResponse = await Oauth2Client.getAccessToken();
  const AccessToken = accessTokenResponse.token;
  // const testAccount = await nodemailer.createTestAccount(); //temporery mail for testing

  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      type: "OAuth2",
      user: process.env.FROM_EMAIL,
      Client_Id: CLIENT_ID,
      Client_Secret: CLIENT_SECRET,
      refresh_Token: REFRESH_TOKEN,
      accessToken: AccessToken,
    },
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false,
    // auth: {
    //   user: testAccount.user,
    //   pass: testAccount.pass,
  });
  return transporter;
};

export { mailtransporter };
