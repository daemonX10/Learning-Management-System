const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

const ConnectToDB =async ()=>{
    try {
        const { connection }= await mongoose.connect(
            process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms-h');
        if (connection){
            console.log(`Connection to MongoDb"${connection}`)
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports=ConnectToDB;