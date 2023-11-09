import app from './app.js';
import connectToDB from './config/dbConnection.js';
import { v2 as cloudinary } from 'cloudinary';

connectToDB();

const PORT  = process.env.PORT || 3000;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})