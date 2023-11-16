import app from './app.js';
import connectToDB from './config/dbConnection.js';
import { v2 as cloudinary } from 'cloudinary';
import Razorpay from 'razorpay';

connectToDB();

const PORT  = process.env.PORT || 3000;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export var razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})