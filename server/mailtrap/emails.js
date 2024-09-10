import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationToken = async (email, verfifcationToken) => {
    const recipient = [email];

    try {
        const response = await mailtrapClient.sendMail({
            from:sender,
            to:recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verfifcationToken),
            category: "Email Verification"
        });

        console.log("Verification mail sent", response);
    } catch (error) {
        console.log(error);
        throw new Error("Error sending verification mail : ", error)
    }
}