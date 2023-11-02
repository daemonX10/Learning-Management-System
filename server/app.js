const  cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const userRoutes = require('./routes/user.routes');
const errorMiddleware = require('./middlewares/error.middleware')

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

module.exports = app;