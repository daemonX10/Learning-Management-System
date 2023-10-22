import cookieParser from "cookie-parser";
import { express } from "express";

const app = express();

app.use(express.json());

app.use(cor({
    origin:[process.env.FRONTEND_URL, 'http://localhost:3000'],
    Credentials: true
}));

app.use(cookieParser());

app.use('ping',(req,res)=>{
    app.send('pong');
})

// 3 route config

app.all("*",()=>{
    res.status(404).send("OOPS! , 404 Page not found")
} );

export default app;