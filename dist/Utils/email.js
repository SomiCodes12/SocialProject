"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptRequestMail = exports.sendfriendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const GOOGLE_ID = "848542784186-9os7noa7qvcg3nckfu38s3bhob8u6oga.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_URL = "https://developer.google.com/oauthplayground";
const GOOGLE_REFRESHTOKEN = "1//04GgN8ydoI_ZdCgYIARAAGAQSNwF-L9IrKCOkFE95PncupZNTb3WCiygNcFb1vp20oW-1SMJTKzSWxnWw2B6nf4S85GXSTpgR44M";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });
const url = "http://localhost:1234";
const sendfriendMail = (user, friend) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
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
            userName: user === null || user === void 0 ? void 0 : user.name,
            friend: friend.name,
            url: `${url}/api/v1/${user.id}/${friend.id}/accept-request`,
        };
        const filePath = path_1.default.join(__dirname, "../Views/friendMail.ejs");
        const readFile = yield ejs_1.default.renderFile(filePath, passedData);
        const mailer = {
            from: "<codelabbest@gmail.com>",
            to: friend.email,
            subject: "Friend Request",
            html: readFile,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendfriendMail = sendfriendMail;
const acceptRequestMail = (user, friend) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
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
            userName: user === null || user === void 0 ? void 0 : user.name,
            friend: friend.name,
        };
        const filePath = path_1.default.join(__dirname, "../Views/acceptMail.ejs");
        const readFile = yield ejs_1.default.renderFile(filePath, passedData);
        const mailer = {
            from: "<somtochukwue98@gmail.com>",
            to: user.email,
            subject: "Accept Request",
            html: readFile,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.acceptRequestMail = acceptRequestMail;
