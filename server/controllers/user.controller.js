import User from '../models/user.model.js'
import AppError from '../utils/appError.js';


const register = async (req,res,next)=>{
    const {fullName,email,password} = req.body

    if(!fullName || !email || !password){
        return next(new AppError('Please provide all the required fields',400))
    };

    const userExists = await User.findOne({email});
    if(!userExists){
        const user = new User({
            fullName,
            email,
            password,
            avatar:{
                public_id:email,
                secure_url:'this is a sample url'
            },
        })

        // TODO: Upload the profile picture to cloudinary
        // TODO: Hash the password
        
        try {
            await user.save();
            user.password = undefined;
            res.status(200).json({
                success: true,
                message: 'User created successfully',
                data: user

            })
        } catch (error) {
            return next(new AppError('Something went wrong',500))
        }
    }
    else{
        return next(new AppError('User already exists',400))
    }


}

const login = (req,res)=>{
        
    }

const logout = (req,res)=>{

    }

const getProfile = (req,res)=>{   
    
    }

export {register,login,logout,getProfile}