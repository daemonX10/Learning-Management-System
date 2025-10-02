import User from '../models/user.model.js'
import AdminRequest from '../models/adminRequest.model.js'
import AppError from '../utils/appError.js';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import cloudinary from 'cloudinary';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
dotenv.config();

const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    // Domain restriction removed to allow cross-domain cookies between Vercel frontend and Render backend
    // Path set to root to ensure cookies are sent for all API routes including payments
    path: '/'
}

const register = async (req,res,next)=>{ 
  
    const {fullName,email,password} = req.body;


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
                secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
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
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(Date.now()),
                httpOnly: true,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
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
        const user = await User.findById(req.user.id);
        
        if(!user){
            return next(new AppError('User not found', 404))
        }

        user.password = undefined;

        const token = await user.generateJWTToken();

        res.cookie('token', token, cookieOptions);
        res.status(200).json({
            success: true,
            message: 'User profile fetched successfully',
            data: user
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
    const { password } = req.body;

    // use this method if not working properly

/*
    // const { forgetPasswordToken } = req.body;
    // const token = forgetPasswordToken.forgetPasswordToken; // assuming forgetPasswordToken is an object with a forgetPasswordToken property

    // const user = await User.findOne({
    //     forgetPasswordToken: token,
    //     forgetPasswordExpire: { $gt: Date.now() }
    // });

*/

    if(!password){
        return next(new AppError('Password is required fields', 400))
    }

    // ! Above code is ok

    const forgetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    try {
        // for debugging
        // /*
        // const userWithToken = await User.findOne({ forgetPasswordToken });
        // console.log(`forgetPasswordExpire: ${userWithToken.forgetPasswordExpire}`);
        // console.log(`Current time: ${Date.now()}`);

        // const user = await User.findOne({
        //     forgetPasswordToken,
        //     forgetPasswordExpire:{$gt:Date.now()}
        // });
        
        // */
        const user = await User.findOne({
            forgetPasswordToken,
            forgetPasswordExpire:{$gt:Date.now()}
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

const ChangePassword = async (req,res,next)=>{
    const { oldPassword, newPassword } = req.body;
    const {id} = req.user;
    // req.user._id is coming from the middleware isLoggedIn which is checking the token and setting the user in req.user object 

    if(!oldPassword || !newPassword){
        return next(new AppError('Enter Both password , oldPassword and NewPassword', 400));
    }

    const user = await User.findById(id).select('+password'); 
    if(!user){
        return next( new AppError("user not found", 400));
    }
    
    const isMatch = await user.comparePassword(oldPassword);

    if(!isMatch){
        return next(new AppError('Old password is incorrect', 400));
    }

    user.password = newPassword;
    await user.save();

    user.password = undefined;

    res.status(200).json({
        success:true,
        message:'Password changed successfully',
        data:user
    })

}

const updateUser = async (req,res,next)=>{
    const {fullName} = req.body;
    const {id} = req.user;

    const user = await User.findById(id);

    if(!user){
        return next(new AppError("User not found", 400));
    }
    
    if(fullName){
        user.fullName = fullName;
    }

    if(req.file){
        try {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id); // delete the previous image from cloudinary
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                widht:250,
                height:250,
                gravity:'face',
                crop:'fill'
            })

            if(result){
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // remove the file from the server
                fs.rm('./uploads/' + req.file.filename);
            }

            await user.save();
            

        } catch (error) {
            return next(new AppError(  error.message || 'unable to update details ',500));
        }
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user
    })
}

const makeUserAdmin = async (req,res,next)=>{
    const { userId } = req.params;
try {
    const user = await User.findById(userId);

    if (!user) {
        return next(new AppError("User not found", 400));
    }

    user.role = 'ADMIN';

    await user.save();
    res.status(200).json({
        success: true,
        message: 'User role updated successfully',
        data: user
    });
} catch (error) {
    return next (new AppError(error.message || 'error in changing the role ', 400));
}
}

const requestAdminAccess = async (req, res, next) => {
    try {
        const { reason, experience } = req.body;
        const userId = req.user.id;

        if (!reason || !experience) {
            return next(new AppError('Reason and experience are required', 400));
        }

        // Check if user already has an admin role
        const user = await User.findById(userId);
        if (user.role === 'ADMIN') {
            return next(new AppError('You already have admin privileges', 400));
        }

        // Check if user already has a pending request
        const existingRequest = await AdminRequest.findOne({
            user: userId,
            status: 'pending'
        });

        if (existingRequest) {
            return next(new AppError('You already have a pending admin request', 400));
        }

        // Create new admin request
        const adminRequest = await AdminRequest.create({
            user: userId,
            reason,
            experience
        });

        await adminRequest.populate('user', 'fullName email');

        res.status(201).json({
            success: true,
            message: 'Admin access request submitted successfully',
            data: adminRequest
        });
    } catch (error) {
        return next(new AppError(error.message || 'Failed to submit admin request', 500));
    }
};

const getAdminRequests = async (req, res, next) => {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};

        const requests = await AdminRequest.find(filter)
            .populate('user', 'fullName email avatar')
            .populate('reviewedBy', 'fullName email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Admin requests retrieved successfully',
            data: requests
        });
    } catch (error) {
        return next(new AppError(error.message || 'Failed to get admin requests', 500));
    }
};

const reviewAdminRequest = async (req, res, next) => {
    try {
        const { requestId } = req.params;
        const { status, reviewNotes } = req.body;
        const adminId = req.user.id;

        if (!['approved', 'rejected'].includes(status)) {
            return next(new AppError('Status must be either approved or rejected', 400));
        }

        const request = await AdminRequest.findById(requestId).populate('user');

        if (!request) {
            return next(new AppError('Admin request not found', 404));
        }

        if (request.status !== 'pending') {
            return next(new AppError('This request has already been reviewed', 400));
        }

        // Update request status
        request.status = status;
        request.reviewedBy = adminId;
        request.reviewedAt = new Date();
        request.reviewNotes = reviewNotes || '';

        await request.save();

        // If approved, update user role
        if (status === 'approved') {
            const user = await User.findById(request.user._id);
            user.role = 'ADMIN';
            await user.save();
        }

        await request.populate('reviewedBy', 'fullName email');

        res.status(200).json({
            success: true,
            message: `Admin request ${status} successfully`,
            data: request
        });
    } catch (error) {
        return next(new AppError(error.message || 'Failed to review admin request', 500));
    }
};

const getUserAdminRequest = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const request = await AdminRequest.findOne({
            user: userId,
            status: 'pending'
        }).populate('reviewedBy', 'fullName email');

        res.status(200).json({
            success: true,
            message: 'User admin request retrieved successfully',
            data: request
        });
    } catch (error) {
        return next(new AppError(error.message || 'Failed to get user admin request', 500));
    }
};

export{register,
        login,
        logout,
        getProfile,
        forgetPassword,
        resetPassword,
        ChangePassword,
        updateUser,
        makeUserAdmin,
        requestAdminAccess,
        getAdminRequests,
        reviewAdminRequest,
        getUserAdminRequest
    }

