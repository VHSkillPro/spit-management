const { body } = require("express-validator");
const { validationResult } = require("../../utils/validators");

const validateCreateBoard = [
    body("id").notEmpty().isString(),
    body("name").notEmpty().isString(),
    body("description").notEmpty().isString(),
    validationResult,
];

const validateUpdateBoard = [
    body("name").optional().isString(),
    body("description").optional().isString(),
    validationResult,
];

module.exports = {
    validateCreateBoard,
    validateUpdateBoard,
};
