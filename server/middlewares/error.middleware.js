const errorMiddleware = (err, req, res, next) => {
    req.statusCode = req.statusCode || 500;
    req.statusMessage = req.statusMessage || 'tuduk tuduk Internal Server Error catched by errorMiddleware';

    return res.status(req.statusCode).json({
        success: false,
        message: req.statusMessage,
        name: err.name, // The name of the error
        code: err.code, // The error code, if one exists
        stack: err.stack // The stack trace
    });
}

export default errorMiddleware;