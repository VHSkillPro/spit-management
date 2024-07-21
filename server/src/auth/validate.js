const { body } = require("express-validator");
const { checkValidationResult } = require("../../middleware/validator");

/**
 * Validate login input fields.
 *
 * @returns {Array} An array of validation checks for username and password fields.
 */
const validateLogin = [
    body("username").notEmpty(),
    body("password").notEmpty(),
    checkValidationResult,
];

module.exports = {
    validateLogin,
};
