import AppError from "../utils/appError.js";
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';
import asyncHandler from "./asyncHandler.middleware.js";


export const isLoggedIn = (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new AppError('Please login to continue',401));
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        logger.error("Error in isLoggedIn middleware : invalid token");
        return next(new AppError(error,500));
    }

}

export const authorizedRoles = (...roles) => (req,res,next)=>{
    const currentRole = req.user;

    if(!roles.includes(currentRole.role)){
        return next(new AppError('You are not authorized to access this route',403));
    }

    next();
};

export const authorizedSubscriber = asyncHandler(async(req,res,next)=>{
    const subscriptionStatus = req.user.subscription.status;
    const currentRole = req.user.role;

    if( currentRole !== 'ADMIN' && subscriptionStatus !== 'active'){
        return next(new AppError('You are not authorized to access this route',403));
    }
});