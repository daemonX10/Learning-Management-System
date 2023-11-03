import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.set('strictQuery',false);

const ConnectToDB = async () => {
    try {
        const { connection } = await mongoose.connect(
            process.env.MONGO_URI);
        if (connection) {
            console.log(`Connection to MongoDb is successful`);
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default ConnectToDB;