const { body, query } = require("express-validator");

const validateRegister = [
    body("username").notEmpty().isLength({ min: 5, max: 20 }).isAlphanumeric(),
    body("password")
        .notEmpty()
        .isLength({ min: 6, max: 20 })
        .matches(/^[a-zA-Z0-9@.#$!%*?&^]+$/),
    body("repassword")
        .notEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error();
            }
            return true;
        }),
];

const validateUpdateUser = [
    body("password")
        .optional()
        .isLength({ min: 6, max: 20 })
        .matches(/^[a-zA-Z0-9@.#$!%*?&^]+$/),
    body("roleId").optional().isNumeric().toInt(),
];

const validateQueryUserIndex = [
    query("username").optional().notEmpty(),
    query("roleId").optional().isNumeric().toInt(),
    query("limit").optional().isNumeric().toInt(),
    query("offset").optional().isNumeric().toInt(),
];

module.exports = {
    validateRegister,
    validateQueryUserIndex,
    validateUpdateUser,
};
