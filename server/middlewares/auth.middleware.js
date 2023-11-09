import AppError from "../utils/appError";
import jwt from 'jsonwebtoken';


const isLoggedIn = (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new AppError('Please login to continue',401));
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log("Error in isLoggedIn middleware : invalid token");
        return next(new AppError(error,500));
    }

}

export default isLoggedIn;