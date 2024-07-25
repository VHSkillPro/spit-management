const { body, query, param } = require("express-validator");
const { validationResult } = require("../../validators");
const roleService = require("../role/roleService");

const validateFilterUser = [
    query("username").optional().notEmpty(),
    query("roleId").optional().isInt().toInt(),
    query("limit").optional().isInt({ min: 0 }).toInt(),
    query("offset").optional().isInt({ min: 0 }).toInt(),
    validationResult,
];

const validateCreateUser = [
    body("username").notEmpty().isLength({ min: 5, max: 255 }).isAlphanumeric(),
    body("password")
        .notEmpty()
        .isLength({ min: 6, max: 255 })
        .matches(/^[a-zA-Z0-9@.#$!%*?&^]+$/),
    body("repassword")
        .notEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error();
            }
            return true;
        }),
    body("roleId")
        .notEmpty()
        .custom(async (roleId) => {
            if (await roleService.getRoleById(roleId)) {
                return true;
            }
            throw new Error();
        }),
    validationResult,
];

const validateUpdateUser = [
    body("password")
        .optional()
        .isLength({ min: 6, max: 255 })
        .matches(/^[a-zA-Z0-9@.#$!%*?&^]+$/),
    body("roleId")
        .optional()
        .custom(async (roleId) => {
            if (await roleService.getRoleById(roleId)) {
                return true;
            }
            throw new Error();
        }),
    validationResult,
];

module.exports = {
    validateFilterUser,
    validateCreateUser,
    validateUpdateUser,
};
