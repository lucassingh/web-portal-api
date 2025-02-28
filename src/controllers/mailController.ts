import { Request, Response } from 'express';
import { sendMail } from '../services/mailService';
import { FormData } from '../interfaces/mailoptions';

export const sendMailController = async (req: Request, res: Response): Promise<void> => {
    const formData: FormData = req.body;

    try {
        await sendMail(formData);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error: error });
    }
};