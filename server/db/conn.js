import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected to DB");
    } catch (error) {
        console.log("Connection Failed");
        process.exit(1);
    }
}

export default connectToDB;