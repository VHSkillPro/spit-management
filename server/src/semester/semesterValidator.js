const { body } = require("express-validator");
const { validationResult } = require("../../utils/validators");

const validateCreateSemester = [
    body("id").notEmpty().isString(),
    body("name").notEmpty().isString(),
    validationResult,
];

module.exports = {
    validateCreateSemester,
};
