const { body } = require("express-validator");
const { validationResult } = require("../../validators");

const validateLogin = [
    body("username").notEmpty(),
    body("password").notEmpty(),
    validationResult,
];

module.exports = {
    validateLogin,
};
