const { check } = require("express-validator");

/**
 * Validate login input fields.
 *
 * @returns {Array} An array of validation checks for username and password fields.
 */
const validateLogin = () => {
    return [
        check("username").notEmpty().withMessage("Username is required."),
        check("password").notEmpty().withMessage("Password is required."),
    ];
};

module.exports = {
    validateLogin: validateLogin(),
};
