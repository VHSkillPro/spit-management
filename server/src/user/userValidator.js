const { body, query } = require("express-validator");
const { validationResult } = require("../../validators");

const validateUsersFilter = [
    query("username").optional().notEmpty(),
    query("roleId").optional().isInt().toInt(),
    query("limit").optional().isInt({ min: 0 }).toInt(),
    query("offset").optional().isInt({ min: 0 }).toInt(),
    validationResult,
];

module.exports = { validateUsersFilter };
