const { body, param } = require("express-validator");
const { validationResult } = require("../../validators");

const validateCreateRole = [
    body("id").notEmpty(),
    body("name").notEmpty(),
    validationResult,
];

const validateUpdateRole = [body("name").notEmpty(), validationResult];

module.exports = {
    validateCreateRole,
    validateUpdateRole,
};
