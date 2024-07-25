const expressValidator = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError");

const validationResult = async (req, res, next) => {
    const errors = expressValidator.validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new AppError(StatusCodes.BAD_REQUEST, "Yêu cầu không hợp lệ")
        );
    }

    return next();
};

module.exports = {
    validationResult,
};
