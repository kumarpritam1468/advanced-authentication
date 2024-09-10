import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import { configDotenv } from "dotenv";

configDotenv();
const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = Nodemailer.createTransport(
    MailtrapTransport({
        token: TOKEN,
    })
);

export const sender = {
    address: "mailtrap@demomailtrap.com",
    name: "Pritam Kumar",
};