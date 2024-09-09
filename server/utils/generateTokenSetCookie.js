import jwt from "jsonwebtoken";

const generateTokenSetCookie = (res, userId) => {
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:"15d"});

        res.cookie("jwt", token, {
            httpOnly:true,
            secure: process.env.NODE_ENV !== "developement",
            sameSite: "strict",
            maxAge: 15 * 24 * 60 * 60 * 1000
        })
    } catch (error) {
        console.error(error);
    }
}

export default generateTokenSetCookie;