import nodemailer from "nodemailer";
import { config } from "./dotenvConfig.js";

export const transporter = nodemailer.createTransport({

    service: "gmail",

    port: 587,

    auth: {

        user: config.nodemailer.gmaccount,

        pass: config.nodemailer.gmpassword,

    },

    secure: false,

    tls: {

        rejectUnauthorized: false

    }

});
