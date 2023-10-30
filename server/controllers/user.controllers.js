const User = require("../models/user.models");

const register = async (req,res)=>{
    // register logic
    const { fullname , email , password} = req.body;

    if(!fullname || !email || !password){
        return next(new AppError("All Field are required ", 400));
    }
    const userExists = await User.findOne({email});
    
    if (userExists){
        return next( new AppError("Email already exists", 400));
    }

    const user = User.create();
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