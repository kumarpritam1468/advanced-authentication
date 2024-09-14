import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationToken = async (email, verfifcationToken) => {
    const recipient = [email];

    try {
        const response = await mailtrapClient.sendMail({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verfifcationToken),
            category: "Email Verification"
        });

        console.log("Verification mail sent", response);
    } catch (error) {
        console.log(error);
        throw new Error("Error sending verification mail : ", error);
    }
}

export const sendWelcomeMail = async (email, name) => {
    const recipient = [email];

    try {
        const response = await mailtrapClient.sendMail({
            from: sender,
            to: recipient,
            subject: "Welcome from Pritam",
            html: WELCOME_EMAIL_TEMPLATE.replace("{{user_name}}", name),
            category: "Welcome Email"
        });

        console.log("Welcome mail sent", response);
    } catch (error) {
        console.log(error);
        throw new Error("Error sending Welcome mail : ", error);
    }
}

export const sendPasswordResetMail = async (email, resetURL) => {
    const recipient = [email];

    try {
        const response = await mailtrapClient.sendMail({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset Mail"
        });

        console.log("Password reset mail sent", response);
    } catch (error) {
        console.log(error);
        throw new Error("Error sending password reset mail : ", error);
    }
}

export const sendPasswordResetSuccessMail = async (email, name) => {
    const recipient = [email];

    try {
        const response = await mailtrapClient.sendMail({
            from: sender,
            to: recipient,
            subject: "Password Reset Success",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{userName}", name),
            category: "Password Reset Success Mail"
        });

        console.log("Password reset success mail sent", response);
    } catch (error) {
        console.log(error);
        throw new Error("Error sending password reset success mail : ", error);
    }
}