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