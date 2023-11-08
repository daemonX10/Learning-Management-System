import { Schema , model } from "mongoose";
import validator from 'validator';


const userSchema = new Schema({
    fullName:{
        type:String,
        required:[true,'Please enter your full name'],
        trim:true,
        maxlength:[30,'Your name cannot exceed 30 characters'],
        minlength:[3,'Your name must be at least 3 characters']
    },
    email:{
        type:String,
        required:[true,'Please enter your email address'],
        unique:[true,'Email already exists'],
        lowercase:[true,'Email must be lowercase'],
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email Address');
            }
        }
    },
    password:{
        type:String,
        minlength:6,
        required:true,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"');
            }
        },
        private:true,
    }
})