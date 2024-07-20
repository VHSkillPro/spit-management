const { body } = require("express-validator");

/**
 * Validate login input fields.
 *
 * @returns {Array} An array of validation checks for username and password fields.
 */
const validateLogin = [
    body("username").notEmpty(),
    body("password").notEmpty(),
];

module.exports = {
    validateLogin,
};
