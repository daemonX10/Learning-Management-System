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
    origin: [
        'https://learning-management-system-damodars-projects.vercel.app',
        'https://learning-management-system-git-master-damodars-projects.vercel.app',
        'https://learning-management-system-self-mu.vercel.app',
        'http://localhost:5173', // For local development
        'http://localhost:3000'  // For local development
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
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

// Debug endpoint to check cookies and authentication
app.get('/api/v1/debug/auth', (req, res) => {
    res.json({
        success: true,
        cookies: req.cookies,
        headers: {
            cookie: req.headers.cookie,
            origin: req.headers.origin,
            userAgent: req.headers['user-agent']
        },
        hasToken: !!req.cookies.token,
        message: 'Debug information'
    });
});

// Test endpoint specifically for payment cookie verification
app.get('/api/v1/debug/payment-auth', (req, res) => {
    const { token } = req.cookies;
    res.json({
        success: true,
        hasToken: !!token,
        tokenLength: token ? token.length : 0,
        cookies: req.cookies,
        cookieHeader: req.headers.cookie,
        origin: req.headers.origin,
        message: token ? 'Token found - ready for payments' : 'No token - please login first',
        timestamp: new Date().toISOString()
    });
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