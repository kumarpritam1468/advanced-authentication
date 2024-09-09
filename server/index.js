import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './db/conn.js';
import authRouter from './routes/authRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`App running on port : ${PORT}`);
    connectToDB();
})