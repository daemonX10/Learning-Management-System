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
        const htmlMessage = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; border-radius: 5px; background-color: #f9f9f9; border: 1px solid #ddd; max-width: 600px; margin: 0 auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="https://avatars.githubusercontent.com/u/115637298?v=4" alt="Your Logo" style="height: 50px;">
                </div>
                <h1 style="color: #4a7eb1; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Contact Us Form</h1>
                <p style="margin-bottom: 10px;">
                    <strong style="color: #4a7eb1;">Name:</strong> 
                    <span style="color: #333;">${name}</span>
                </p>
                <p style="margin-bottom: 10px;">
                    <strong style="color: #4a7eb1;">Email:</strong> 
                    <span style="color: #333;">${email}</span>
                </p>
                <p style="margin-bottom: 10px;">
                    <strong style="color: #4a7eb1;">Message:</strong> 
                    <span style="color: #333;">${message}</span>
                </p>
                <hr style="border: none; border-top: 1px solid #ddd;">
                <p style="color: #777; font-size: 0.8em;">This is an automated message from your Contact Us form.</p>
            </div>
        `;

        // await sendEmail
        await sendEmail(
            process.env.CONTACT_US_EMAIL,
            subject,
            htmlMessage
        );
    } catch (error) {
        return next(new AppError(error.message || 'Email could not be sent',500));
    }

    res.status(200).json({
        success:true,
        message:'Your message has been sent successfully',
        data: req.body,
    });

});

export const userStats = asyncHandler(async (req,res,next)=>{
    const allUsersCount= await User.countDocuments();

    const subscribedUsersCount = await User.countDocuments({
        'subscription.status':'Active',
    });

    res.status(200).json({
        success:true,
        message:'All registered users count',
        allUsersCount,
        subscribedUsersCount,
    });
})