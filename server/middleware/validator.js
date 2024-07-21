const { validationResult } = require("express-validator");
const HTTP_STATUS_CODE = require("../utils/httpStatusCode");

const checkValidationResult = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
            status: "error",
            message: "Request không hợp lệ",
        });
    }

    return next();
};

module.exports = {
    checkValidationResult,
};
