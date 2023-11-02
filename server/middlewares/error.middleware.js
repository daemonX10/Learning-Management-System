const errorMiddleware = (error, req, res)=>{
    
    req.statusCode = req.statusCode || 500 ;
    req.message = req.message || "something went wrong";

    res.status().json({
        success:false,
        message:req.message,
        stack: error.stack
    })
}

export default errorMiddleware;