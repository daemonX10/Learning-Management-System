import { Schema , model } from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

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
        required:[true,'Please enter your password'],
        select:false, 
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"');
            }
        },
        private:true,
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:'USER'
    },
    avatar:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    },
    forgotPasswordToken:String,
    forgotPasswordExpire:Date,
    subscription:{
        id:String,
        status:String
    },
    },
    {
        timestamps:true
});

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
});
userSchema.methods = {
    comparePassword: function(plainTextPassword){
        return bcrypt.compare(plainTextPassword,this.password);
    },
    generateJWTToken: async function(){
        return await jwt.sign({
            id:this.id,
            role:this.role,
            subscription:this.subscription
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY || '7d'
        }
        )},
        
    generatePasswordResetToken: async function(){
        // creating a random token using node's built-in crypto module
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Again using crypto module to hash the generated resetToken with sha256 algorithm and storing it in database
        this.forgotPasswordToken = undefined;
        this.forgotPasswordExpire = undefined;

        this.forgotPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        this.forgotPasswordExpire =new  Date(Date.now() + 30*60* 60 * 1000); // 30 days
        // console.log(`coded token ${this.forgotPasswordToken}`);
        // console.log(`expiry time ${this.forgotPasswordExpire}`)
        return resetToken;
    }
};



const User = model('User',userSchema);
export  default User;