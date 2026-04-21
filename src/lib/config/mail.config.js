//import
import nodemailer from "nodemailer";
import * as googleapisModule from "googleapis";

// Access the nested 'google' property, which holds the auth object
const google = googleapisModule.google;

const getRequiredEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required mail environment variable: ${name}`);
  }
  return value;
};

const mailtransporter = async () => {
  const clientId = getRequiredEnv("GMAIL_CLIENT_ID");
  const clientSecret = getRequiredEnv("GMAIL_CLIENT_SECRET");
  const redirectUri = process.env.GMAIL_REDIRECT_URI;
  const refreshToken = getRequiredEnv("GMAIL_REFRESH_TOKEN");
  const fromEmail = getRequiredEnv("FROM_EMAIL");

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri,
  );
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const accessTokenResponse = await oauth2Client.getAccessToken();
  const AccessToken = accessTokenResponse.token;
  if (!AccessToken) {
    throw new Error("Failed to acquire Gmail OAuth access token");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      type: "OAuth2",
      user: fromEmail,
      clientId,
      clientSecret,
      refreshToken,
      accessToken: AccessToken,
    },
  });
  return transporter;
};

export { mailtransporter };
