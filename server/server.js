import app from './app';

import ConnectToDB from './config/dbConnect';


const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
    ConnectToDB
    console.log(`server is running on port http://localhost:${PORT}`)
})