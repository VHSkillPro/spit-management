class AppError extends Error {
    /**
     * @param {number} statusCode
     * @param {string} message
     * @param {boolean} isOperational
     * @param {string} stack
     */
    constructor(statusCode, message, isOperational = true, stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = AppError;
