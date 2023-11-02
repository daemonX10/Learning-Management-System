import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import userRoutes from './routes/user.routes.js';
import errorMiddleware from './middlewares/error.middleware.js'


const app = express();

app.use(express.json());

app.use(cors({
    origin:[process.env.FRONTEND_URL, 'http://localhost:3000'],
    credentials: true
}));

app.use(cookieParser());

app.use('/ping',(req,res)=>{
    res.send('pong');
})

// 3 route config
app.use('/api/v1/user',userRoutes);

app.all("*",(req,res)=>{
    res.status(404).send("OOPS! , 404 Page not found")
} );

app.use(errorMiddleware)

export default app;