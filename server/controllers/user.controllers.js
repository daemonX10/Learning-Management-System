const User = require("../models/user.models");
const AppError = require("../utils/appError");

const register = async (req,res)=>{
    // register logic
    const { fullName , email , password} = req.body;

    if(!fullName || !email || !password){
        return next(new AppError("All Field are required ", 400));
    }
    const userExists = await User.findOne({email});
    
    if (userExists){
        return next( new AppError("Email already exists", 400));
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:'https://res.couldinary.com'
        }
    });

    if(!User){
        return next(new AppError("User registration failed",400));
    }
    // TODO :upload user picture

    await user.save();

    TODO // GET JWT TOKEN IN COOKIES

    user.password=undefined;
    
    res.status(200).json({
        success:true,
        message:'User registerd',
        user
    })
}

const login = (req,res)=>{
    // login logic

}

const logout = (req,res)=>{
    // logout logic

}

const getProfile = (req,res)=>{
    // getProfile logic

}

module.exports= {
    register,login,logout,getProfile
}