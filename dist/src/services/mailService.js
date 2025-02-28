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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = require("nodemailer");
const sendMail = (formData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const toEmail = formData.service.value === "Employment Verification"
            ? process.env.MAIL_TO_HR
            : process.env.MAIL_TO_SALES;
        console.log('variable', process.env.SMTP_SERVER);
        const transporter = (0, nodemailer_1.createTransport)({
            service: 'smtp',
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_SECRET_KEY
            },
            host: process.env.SMTP_SERVER,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_ENABLE_SSL === "true",
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: Number(process.env.SMTP_TIMEOUT) || 10000
        });
        const mailOptions = {
            from: `Formulario de Contacto <${formData.email}>`,
            to: toEmail || "default@example.com",
            subject: `Nuevo mensaje de ${formData.name}`,
            text: `Nombre: ${formData.name}\nTeléfono: ${formData.phone}\nMensaje: ${formData.challenge}`,
            html: `
                    <h1>Nuevo mensaje de ${formData.name}</h1>
                    <p><strong>Teléfono:</strong> ${formData.phone}</p>
                    <p><strong>Email:</strong> ${formData.email}</p>
                    <p><strong>Mensaje:</strong> ${formData.challenge}</p>
                `,
        };
        const result = yield transporter.sendMail(mailOptions);
        console.log('Email sent...', result);
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
});
exports.sendMail = sendMail;
