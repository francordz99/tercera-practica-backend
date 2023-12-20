import { transporter } from "../config/nodemailerConfig.js";
import { config } from "../config/dotenvConfig.js";
import { __dirname } from "../utils.js";
import jwt from "jsonwebtoken";
import path from 'path';
import { mailingErrors } from './errors/mailingErrors.js';
import { logger } from "../helpers/loggerConfig.js";

const MailingService = {
    sendPurchaseConfirmation: async (userEmail, ticketCode) => {
        try {
            const result = await transporter.sendMail({
                from: config.nodemailer.gmaccount,
                to: userEmail,
                subject: "Compra Exitosa - E-Commerce TurboCenter",
                html: `<p>Gracias por tu compra. Tu código de ticket es: ${ticketCode}</p>
                    <img src="cid:success">`,
                attachments: [
                    {
                        filename: "success.png",
                        path: path.join(__dirname, "/assets/images/success.png"),
                        cid: "success"
                    },
                    {
                        filename: "terms.txt",
                        path: path.join(__dirname, "/assets/documents/terms.txt"),
                        cid: "terms"
                    }
                ]
            });

            return { success: true, result };
        } catch (error) {
            logger.error('Error al enviar el correo:', error);
            mailingErrors.sendPurchaseConfirmationError(error);
            return { success: false, error: 'Hubo un error al enviar el correo' };
        }
    },
    generateEmailToken: async (email, expires) => {
        const token = jwt.sign({ email }, config.nodemailer.gmrecoverytoken, { expiresIn: expires });
        return token;
    },
    sendRecoveryEmail: async (req, userEmail, token) => {
        const domain = `${req.protocol}://${req.get('host')}`;
        const link = `${domain}/resetPasswordStepTwo?token=${token}`
        await transporter.sendMail({
            from: "E-Commerce TurboCenter",
            to: userEmail,
            subject: "Reestablece Tu Contraseña",
            html: `<div>
            <p>Solicitaste reestablecer la contraseña , para hacerlo haz click <a href="${link}">aquí</a></p>
            </div>`
        });
    },
};

export default MailingService;
