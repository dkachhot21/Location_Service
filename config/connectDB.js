import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING);//made change here
        console.log("MongoDB Connected", (await connect).connection.host);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};