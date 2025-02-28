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
exports.createTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const CLIENT_ID = process.env.CLIENT_ID || 'YOUR CLIENT ID';
const CLIENT_SECRET = process.env.CLIENT_SECRET || 'YOUR CLIENT SECRET';
const REDIRECT_URI = process.env.REDIRECT_URI || 'YOUR URL REDIRECT';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN || 'YOUR REFRESH TOKEN';
const oAuth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const createTransporter = () => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield oAuth2Client.getAccessToken();
    if (!accessToken.token) {
        throw new Error('Failed to retrieve access token');
    }
    return nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_USER || 'your authorized email address',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken.token,
        },
    });
});
exports.createTransporter = createTransporter;
