import nodemailer from "nodemailer";
import { google } from "googleapis";
import path from "path";
import ejs from "ejs";

const GOOGLE_ID =
  "848542784186-9os7noa7qvcg3nckfu38s3bhob8u6oga.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_URL = "https://developer.google.com/oauthplayground";
const GOOGLE_REFRESHTOKEN =
  "1//04GgN8ydoI_ZdCgYIARAAGAQSNwF-L9IrKCOkFE95PncupZNTb3WCiygNcFb1vp20oW-1SMJTKzSWxnWw2B6nf4S85GXSTpgR44M";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });

const url = "http://localhost:1234";

export const sendfriendMail = async (user: any, friend: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "codelabbest@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESHTOKEN,
        accessToken,
      },
    });

    const passedData = {
      userName: user?.name,
      friend: friend.name,
      url: `${url}/api/v1/${user.id}/${friend.id}/accept-request`,
    };

    const filePath = path.join(__dirname, "../Views/friendMail.ejs");

    const readFile = await ejs.renderFile(filePath, passedData);

    const mailer = {
      from: "<codelabbest@gmail.com>",
      to: friend.email,
      subject: "Friend Request",
      html: readFile,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};

export const acceptRequestMail = async (user: any, friend: any) => {
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
    };

    const filePath = path.join(__dirname, "../Views/acceptMail.ejs");

    const readFile = await ejs.renderFile(filePath, passedData);

    const mailer = {
      from: "<somtochukwue98@gmail.com>",
      to: user.email,
      subject: "Accept Request",
      html: readFile,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};
