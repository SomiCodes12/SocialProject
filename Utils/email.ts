import nodemailer from "nodemailer";
import { google } from "googleapis";
import path from "path";
import ejs from "ejs";

const GOOGLE_ID =
  "981511888696-hdgqprvls92mp2ov9baku2sajt9b6obq.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_URL = "https://developer.google.com/oauthplayground";
const GOOGLE_REFRESHTOKEN =
  "1//04W6rv-IrO9hTCgYIARAAGAQSNwF-L9Ir3yTvN3qTA8nXd0DPxZMAyiIScc_oLEYIb6aMbWfeKA3NfoctKfzqzWaVy-X5H_oV8hA";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });

const url = "http://localhost:1234";

export const friendMail = async (user: any, friend: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "somtochukwue98@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESHTOKEN,
        accessToken,
      },
    });

    const passedData = {
      userName: user?.name,
      friend: friend.name,
      url: `${url}/api/v1/${user.id}/${friend.id}/send-request`,
    };

    const filePath = path.join(__dirname, "../Views/friendMail.ejs");

    const readFile = await ejs.renderFile(filePath, passedData);

    const mailer = {
      from: "<somtochukwue98@gmail.com>",
      to: friend.email,
      subject: "Friend Request",
      html: readFile,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};
