import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenSetCookie from "../utils/generateTokenSetCookie.js"
import { sendVerificationToken, sendWelcomeMail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });

        await newUser.save();

        generateTokenSetCookie(res, newUser._id);

        await sendVerificationToken(newUser.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "Account created",
            user: {
                ...newUser._doc,
                password: "Hidden"
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    try {

    } catch (error) {

    }
}

export const logout = async (req, res) => {
    try {

    } catch (error) {

    }
}

export const verifyEmail = async (req, res) => {
    try {
        const { code } = req.body;

        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid code" });
        }

        // await sendWelcomeMail(user.email, user.name);

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();


        res.status(200).json({
            success: true,
            message: "Verified Email Successfully",
            user: {
                ...newUser._doc,
                password: "Hidden"
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}