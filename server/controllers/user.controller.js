import User from '../models/user.model.js'
import AppError from '../utils/appError.js';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import cloudinary from 'cloudinary';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
dotenv.config();

const cookieOptions = {
    expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRy * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true
}

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

    // TODO: Upload the profile picture to 
    
    if(req.file){
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                widht:250,
                height:250,
                gravity:'face',
                crop:'fill'
            });

            if(result){
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // remove the file from the server
                fs.rm('./uploads/' + req.file.filename);
            }
        } catch (error) {
            return next(new AppError(error.message || 'File not uploaded , please try again',500));
        }
    }
        try {
            await user.save();
            user.password = undefined;
            const token = await user.generateJWTToken();
            res.cookie('token', token, cookieOptions);
            res.status(200).json({
                success: true,
                message: 'User created successfully',
                data: user
                
            })
        } catch (error) {
            return next(new AppError(error,500))
        }
    }
    else{
        return next(new AppError('User already exists',400))
    }
}

const login = async (req,res,next)=>{

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide all the required fields', 400))
    };

    try {

        const user = await User.findOne({ email })
            .select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError('Invalid credentials', 401))
        }

        const token = await user.generateJWTToken();
        user.password = undefined;
        res.cookie('token', token, cookieOptions);
        res.status(201).json({
            success: true,
            message: 'User logged in successfully',
            data: user
        })
    } catch (error) {
        return next(new AppError(error,500));
    }

    }

const logout = (req,res,next)=>{
        try {
            res.cookie('token', null, {
                secure: true,
                expires: new Date(Date.now()),
                httpOnly: true
            });
            res.status(200).json({
                success: true,
                message: 'User logged out successfully'
            })
        } catch (error) {
            return next(new AppError(error,500))
        }
    }

const getProfile = async (req,res,next)=>{   
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            message: 'User profile fetched successfully'
        })
    } catch (error) {
        return next(new AppError(error,500));
    }
    }

const forgetPassword = async (req,res,next)=>{
    const { email } = req.body;

    if (!email) {
        return next(new AppError('Please provide email ', 400))
    };

    const user = await User.findOne({email});
    if(!user){
        return next(new AppError('Email is not Registerd', 404));
    }

    try {
        const resetToken = await user.generatePasswordResetToken();
        await user.save();

        const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Sending the resetPasswordUrl to user's email along with message
        const subject = 'Password reset token';
        const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

        await sendEmail(email, subject, message);
        res.status(200).json({
            success:true,
            message:'Email sent successfully'
        });
    } catch (error) {
        user.forgetPasswordToken = undefined;
        user.forgetPasswordExpire = undefined;
        await user.save();
        return next(new AppError(error.message || 'Email could not be sent', 500));
    }

}

const resetPassword = async (req,res,next)=>{
    const { resetToken } = req.params;
    const { password , email } = req.body;

    if(!password){
        return next(new AppError('Password is required fields', 400))
    }

    // ! Above code is ok

    const forgetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    try {
        const user = await User.findOne({
            forgetPasswordToken
        });

        if(!user){
            return next(new AppError("User is null , unable to fetch forgetPasswordToken",500));
        }
        
        user.password = password;
        user.forgetPasswordToken = undefined;
        user.forgetPasswordExpire = undefined;

        await user.save();
        res.status(200).json({
            success:true,
            message:'Password reset successfully'
        });
    } catch (error) {
        return next(new AppError(error.message || 'Unable to Update the password', 400));
    }
}


export{register,
        login,
        logout,
        getProfile,
        forgetPassword,
        resetPassword 
    }