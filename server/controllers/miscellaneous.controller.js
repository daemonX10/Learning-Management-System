import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import AppError from '../utils/appError.js';
import sendEmail from '../utils/sendEmail.js';

export const  contactUs = asyncHandler(async (req, res, next) => {
    const { name , email, message } = req.body;

    if(!name || !email || !message){
        return next(new AppError('Name , email , Message are required',400));
    }
    
    try {
        const subject = 'contact Us form';
        const textMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

        // await sendEmail
        await sendEmail(
            process.env.CONTACT_US_EMAIL,
            subject,
            textMessage
        );
    } catch (error) {
        return next(new AppError(error.message || 'Email could not be sent',500));
    }

    res.status(200).json({
        success:true,
        message:'Email sent'
    });

});

export const userStats = asyncHandler(async (req,res,next)=>{

})