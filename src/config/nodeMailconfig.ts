import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID: string = process.env.CLIENT_ID || 'YOUR CLIENT ID';
const CLIENT_SECRET: string = process.env.CLIENT_SECRET || 'YOUR CLIENT SECRET';
const REDIRECT_URI: string = process.env.REDIRECT_URI || 'YOUR URL REDIRECT';
const REFRESH_TOKEN: string = process.env.REFRESH_TOKEN || 'YOUR REFRESH TOKEN';

const oAuth2Client: OAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const createTransporter = async () => {
    const accessToken = await oAuth2Client.getAccessToken();

    if (!accessToken.token) {
        throw new Error('Failed to retrieve access token');
    }

    return nodemailer.createTransport({
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
};