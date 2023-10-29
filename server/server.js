const app = require('./app');


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)
})