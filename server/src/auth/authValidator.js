const { body } = require("express-validator");
const { validationResult } = require("../../utils/validators");

const validateLogin = [
    body("username").notEmpty(),
    body("password").notEmpty(),
    validationResult,
];

module.exports = {
    validateLogin,
};
