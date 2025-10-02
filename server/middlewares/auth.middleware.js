import AppError from "../utils/appError.js";
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';
import asyncHandler from "./asyncHandler.middleware.js";


export const isLoggedIn = (req,res,next)=>{
    
    const {token} = req.cookies;
    
    // Enhanced debug logging for production
    logger.info("Authentication Debug:", {
        route: req.originalUrl,
        method: req.method,
        cookies: req.cookies,
        cookieHeader: req.headers.cookie,
        origin: req.headers.origin,
        hasToken: !!token,
        tokenLength: token ? token.length : 0,
        timestamp: new Date().toISOString()
    });

    if(!token){
        logger.warn("Authentication failed: No token found", {
            route: req.originalUrl,
            origin: req.headers.origin,
            cookieHeader: req.headers.cookie
        });
        return next(new AppError('Please login to continue. No authentication token found.',401));
    }
    
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        logger.info("Authentication successful", {
            userId: decode.id,
            userEmail: decode.email,
            route: req.originalUrl
        });
        next();
    } catch (error) {
        logger.error("Error in isLoggedIn middleware: ", {
            error: error.message,
            route: req.originalUrl,
            tokenLength: token ? token.length : 0
        });
        
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