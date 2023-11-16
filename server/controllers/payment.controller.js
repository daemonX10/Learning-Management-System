import User from "../models/user.model.js"
import { razorpay } from "../server.js"
import AppError from "../utils/appError.js"


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
        });

        // update user subscription

        user.subscription.id = subscription.id;
        user.status.status = "active";

        await user.save();

        res.status(200).json({
            success:true,
            message:"Subscription Successfull",
            subscription
        })


    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}

export const verifySubscription = async(req, res, next)=>{
    try {

    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}

export const cancelSubscription = async(req, res, next)=>{
    try {

    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}

export const getAllPayments = async(req, res, next)=>{
    try {

    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}