import mongoose from "mongoose";
import "dotenv/config"

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/Admin-Panel`)
        console.log("MongoDB Connected Successfully on Admin-Panel database")
    } catch (error) {
        console.log("MongoDB Connection is failed")
    }
}

export default connectDB;
