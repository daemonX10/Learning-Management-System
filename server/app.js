import express from 'express'; 
import cors from 'cors';
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

app.use('/damodar', (req, res) => {
    try {
        res.send('Hello from damodar');
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
});

app.use('*',(req,res)=>{
    res.status(404).send('404, Page Not Found');
})


export default app;