import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import morgan from 'morgan';
dotenv.config();
const app = express();  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}));
app.use(cookieParser());

app.use(morgan('dev'));

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
app.use('/api/v1/user',userRoutes);


app.use('*',(req,res)=>{
    res.status(404).send('404, Page Not Found');
})

app.use(errorMiddleware);


export default app;