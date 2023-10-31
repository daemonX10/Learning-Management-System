/* The AppError class is a custom error class in JavaScript that captures the stack trace and includes
a status code. */
/**
 * The above code defines a constructor function in JavaScript that
 * creates an Error object with a custom message and status code.
 * @param message - The `message` parameter is a string that represents
 * the error message associated with the error. It provides information
 * about what went wrong or why the error occurred.
 * @param statusCode - The `statusCode` parameter is used to specify the
 * status code of the error. In HTTP, status codes are used to indicate
 * the outcome of a request. For example, a status code of 200 indicates
 * a successful request, while a status code of 404 indicates that the
 * requested resource was not found
*/

class AppError extends Error {
    constructor (message,statusCode){
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this,this.contructor);
    }
}

module.exports= AppError;