import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set('strictQuery', false);

const connectToDB = async ()=>{
    try {
        const { connection } = await mongoose.connect(
            process.env.MONGO_URI,
        )
        console.log(`MongoDB connected to ${connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectToDB;