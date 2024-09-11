import express from "express";
import { login, logout, signup, verifyEmail } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/verify-email', verifyEmail);

export default authRouter;