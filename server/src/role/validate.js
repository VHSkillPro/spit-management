const { body, param } = require("express-validator");
const { checkValidationResult } = require("../../middleware/validator");

const validateCreateRole = [body("name").notEmpty(), checkValidationResult];

const validateUpdateRole = [
    body("name").notEmpty(),
    param("roleId").notEmpty().isNumeric().toInt(),
    checkValidationResult,
];

module.exports = {
    validateCreateRole,
    validateUpdateRole,
};
