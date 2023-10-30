const { Schema,model } = require('mongoose');

const userSchema = new Schema({
    fullName:{
        type:String,
        required:[true,"Full name is required"],
        minLength :[6,"Full name must be at least 6 characters long"],
        maxLength:[50,"Full name must be at most 50 characters long"],
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email must be unique"],
        lowercase:true,
        trim:true,
        match:[/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,"Email is invalid"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[8,'Password mus be atleast 8 characters'],
        select:false
    },
    avator : {
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    time_stamps:
    {
        timestamps : true
    }
})

