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
        logger.error("Error in isLoggedIn middleware: ", error.message);
        
        if (error.name === 'TokenExpiredError') {
            return next(new AppError('Token expired, please login again', 401));
        } else if (error.name === 'JsonWebTokenError') {
            return next(new AppError('Invalid token, please login again', 401));
        } else {
            return next(new AppError('Authentication failed', 401));
        }
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

    if( currentRole !== 'ADMIN' && subscriptionStatus !== 'Active'){
        return next(new AppError('You are not authorized to access this route',403));
    }
    
    next();
});