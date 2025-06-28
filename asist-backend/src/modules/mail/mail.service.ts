import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendVerificationEmail(email: string, verificationToken: string) {
        const verificationUrl = `https://asistin.onrender.com/auth/verificar?token=${verificationToken}`;
        const mailOptions = {
            from: '"No Reply" <no-reply@example.com>', 
            to: email,
            subject: 'Verifica tu cuenta',
            text: `Por favor verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationUrl}`, 
            html: `<b>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</b> <a href="${verificationUrl}">${verificationUrl}</a>`, 
        };

        await this.transporter.sendMail(mailOptions);
    }

    async sendRecoveryEmail(email: string, recoveryToken: string) {
        const recoveryUrl = `https://asistin.onrender.com/auth/reset-password?token=${recoveryToken}`;
        const mailOptions = {
            from: '"No Reply" <no-reply@example.com>',
            to: email,
            subject: 'Recupera tu contraseña',
            text: `Por favor, restablece tu contraseña haciendo clic en el siguiente enlace: ${recoveryUrl}`,
            html: `<b>Por favor, restablece tu contraseña haciendo clic en el siguiente enlace:</b> <a href="${recoveryUrl}">${recoveryUrl}</a>`,
        };
    
        await this.transporter.sendMail(mailOptions);
    }
}