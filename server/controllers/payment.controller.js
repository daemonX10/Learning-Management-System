import User from "../models/user.model.js"
import Payment from "../models/payment.model.js"
import { razorpay } from "../server.js"
import AppError from "../utils/appError.js"
import crypto from "crypto";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";


export const getRazorpayApiKey = async(req, res, next)=>{
    try {
        res.status(200).json({
            success:true,
            message:"Razorpay Api Key",
            key: process.env.RAZORPAY_KEY_ID
        })
    } catch (error) {
        return next( new AppError (error.message, 500))
    }
}

export const buySubscription = async(req, res, next)=>{
    try {
        const { id } = req.user;

        const user = await User.findById(id);

        if(!user){
            return next(new AppError("User does not exist", 404))
        }

        if(user.role === "ADMIN"){
            return next(new AppError("ADMIN cannot buy subscription", 400))
        }

        if(user.subscription.status === "active"){
            return next(new AppError("User already has an active subscription", 400))
        }

        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify:1,
            total_count : 12 // 12 means it will charge every month for a 1-year sub.
        });

        // update user subscription

        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;

        await user.save();

        res.status(200).json({
            success:true,
            message:"Subscription Successfully",
            subscription_id: subscription.id
        });
    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}

export const verifySubscription = async(req, res, next)=>{
    try {
        const { id } = req.user;
        const user = await User.findById(id);

        if(!user){
            return next(new AppError("User does not exist", 404))
        }
        
        const {
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id 
        } = req.body;

        const generatedSignature = crypto
        .createHmac("sha256",process.env.RAZORPAY_SECRET)
        .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
        .digest("hex");

        if( generatedSignature !== razorpay_signature){
            return next(
                new AppError ("payment verification failed , signature mismatch ", 400)
            )
        }

        await Payment.create({
            user: user._id,
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id,
        });

        user.subscription.status = "Active";
        await user.save();

        res.status(200).json({
            success:true,
            message:"Payment Verified"
        });

    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}

export const cancelSubscription = async(req, res, next)=>{
    try {
        const { id } = req.user;
        const user = await User.findById(id);

        if (!user) {
            return next(new AppError("User does not exist", 404))
        }

        if(user.role === "ADMIN"){
            return next(new AppError("ADMIN cannot cancel subscription", 400))
        }
        
        const subscriptionId = user.subscription.id;
        
        try {
            const subscription = await razorpay.subscriptions.cancel(subscriptionId);

            user.subscription.status = subscription.status;
            await user.save();

        } catch (error) {
            return next ( new AppError(error.message,500))
        }

        const payment = await Payment.findOne({
            razorpay_subscription_id : subscriptionId
        });
        console.log('payment',payment);

        const timeSinceSubscribed = Date.now() - payment.createdAt;

        const refundPeriod = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds

        if(timeSinceSubscribed >= refundPeriod){
            return next(new AppError("Refund period has expired", 400))
        }

        await razorpay.payments.refund(payment.razorpay_payment_id,{
            speed: "optimum" // "optimum" or "instant" 
        });

        user.subscription.id = undefined;
        user.subscription.status = undefined;

        await user.save();
        await Payment.deleteOne(payment._id) ;

        res.status(200).json({
            success:true,
            message:"Subscription Cancelled"
        });
    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}

export const getAllPayments = asyncHandler(async (req, res, next) => {
    const {count,skip } = req.query;

    const subscription = await razorpay.subscriptions.all({
        count: count || 10,
        skip: skip || 0
    })

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const finalMonths = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
    };

    const monthlyWisePayments = subscription.items.map((payment)=>{
        const monthsInNumbers = new Date(payment.start_at * 1000);
        return monthNames[monthsInNumbers.getMonth()];
    });

    monthlyWisePayments.map((month)=>{
        Object.keys(finalMonths).forEach((objMonth)=>{
            if(month === objMonth){
                finalMonths[month] += 1;
            }
        })
    });

    const monthlySalesRecord = [];

    Object.keys(finalMonths).forEach((monthName)=>{
        monthlySalesRecord.push(finalMonths[monthName]);
    });

    res.status(200).json({
        success:true,
        message:"All Payments",
        subscription,
        finalMonths,
        monthlySalesRecord
    })
});