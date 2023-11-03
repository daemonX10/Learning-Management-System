import app from './app.js';

// import ConnectToDB from './config/dbConnect.js';


const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
    
    console.log(`server is running on port http://localhost:${PORT}`)
})