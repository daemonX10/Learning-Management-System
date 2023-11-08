import User from '../models/user.model.js'
import AppError from '../utils/appError.js';


const register = async (req,res)=>{
    const {fullName,email,password} = req.body

    if(!fullName || !email || !password){
        return next(new AppError('Please provide all the required fields',400))
    };

    const userExists = User.findOne({email});
    if(!userExists){
        try {
            const user = await User.create({
                fullName,
                email,
                passwword,
                avatar:{
                    public_id:'this is a sample public id',
                    secure_url:'this is a sample url'
                }
            })
        } catch (error) {
            return next(new AppError(error,400))
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