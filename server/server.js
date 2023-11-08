import app from './app.js';
import connectToDB from './config/dbConnection.js';

connectToDB();

const PORT  = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})