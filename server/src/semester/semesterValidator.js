const { body } = require("express-validator");
const { validationResult } = require("../../utils/validators");

const validateCreateSemester = [
    body("id").notEmpty().isString(),
    body("name").notEmpty().isString(),
    validationResult,
];

const validateUpdateSemester = [
    body("name").optional().isString(),
    validationResult,
];

module.exports = {
    validateCreateSemester,
    validateUpdateSemester,
};
