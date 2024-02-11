import logger from '../utils/logger.js'; // path to your logger file

const errorMiddleware = (err, req, res, next) => {
    req.statusCode = req.statusCode || 500;
    req.statusMessage = req.statusMessage || ' Internal Server Error catched by errorMiddleware';

    logger.error({
        message: req.statusMessage,
        name: err.name,
        code: err.code,
        stack: err.stack
    });

    return res.status(req.statusCode).json({
        success: false,
        message: req.statusMessage,
        name: err.name,
        code: err.code,
        stack: err.stack
    });
}

export default errorMiddleware;