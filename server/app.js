import express from 'express'; 
import cors from 'cors';
/* The `cors` middleware is used to enable Cross-Origin Resource Sharing (CORS) in the Express application. CORS is a mechanism that allows resources (e.g., APIs) ona web page to be requested from another domain outside the domain from which theresource originated. */
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();  

app.use(express.json());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}));
app.use(cookieParser());


export default app;