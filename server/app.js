import express from 'express'; 
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import miscesllaneousRoutes from './routes/miscellaneous.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}));


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
app.use('/api/v1/course',courseRoutes);
app.use('/api/v1/payment',paymentRoutes);
app.use('/api/v1', miscesllaneousRoutes);

app.use('*',(req,res)=>{
    res.status(404).send('404, Page Not Found');
})

app.use(errorMiddleware);

export default app;