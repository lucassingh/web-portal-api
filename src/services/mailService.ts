import { MailOptions, FormData } from "../interfaces/mailoptions";
import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendMail = async (formData: FormData): Promise<void> => {
    try {
        const toEmail = formData.service.value === "Employment Verification"
            ? process.env.MAIL_TO_HR
            : process.env.MAIL_TO_SALES;
        console.log('variable', process.env.SMTP_SERVER)
        const transporter = createTransport({
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
        } as SMTPTransport.Options);

        const mailOptions: MailOptions = {
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

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent...', result);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};