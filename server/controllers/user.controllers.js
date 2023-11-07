import User from "../models/user.models.js";
import AppError from "../utils/appError.js";

const cookieOptions  = {
    secure: true,
    maxAge: 7*24*60*60*1000,
    httpOnly : true
}

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

const login = async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password ){
        return next( new AppError ("All field are required ", 400));
    }

    const user = await User.findOne({
        email
    }).select('+password');
    // TODO bcrypt the password comparison
    if(!user || user.comparePaaword (password)){
        return next( new AppError ("email or password do not match",400));
    }
    
    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie('token',token, cookieOptions);

    res.status(201).json({
        success:true,
        message:"User registered Successfully",
        user
    })

}

const logout = (req,res)=>{
    res.cookie('token', null ,{
        secure: true,
        maxAge : 0,
        httpOnly: true
    });
    
    res.status(200).json({
        success:true,
        message:'User logged out Successfully'
    })
}

const getProfile = (req,res)=>{
    const user = User.findById(req.user.id);

    res.status(200).json({
        success : true,
        message : "user details",
        user
    })


}

export {
    register,
    login,
    logout,
    getProfile
}