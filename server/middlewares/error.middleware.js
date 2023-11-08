const errorMiddleware = (err,req,res,next)=>{
    req.statusCode = req.statusCode || 500;
    req.statusMessage = req.statusMessage || 'Internal Server Error catched by errorMiddleware';

    return res.status(req.statusCode).json({
        success:false,
        message:req.statusMessage,
        stack:err.stack
    });
}

export default errorMiddleware;