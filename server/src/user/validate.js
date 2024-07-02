const { check } = require("express-validator");

/**
 * Validate the registration data for a user.
 *
 * @returns {Array} An array of validation middleware functions for 'username', 'password', and 'repassword'.
 */
const validateRegister = () => {
    return [
        check("username")
            .notEmpty()
            .withMessage("Username is required.")
            .isLength({ min: 5, max: 20 })
            .withMessage("Username must be between 5 and 20 characters long.")
            .isAlphanumeric()
            .withMessage(
                "Username can only contain alphabetic and numeric characters."
            )
            .escape(),

        check("password")
            .notEmpty()
            .withMessage("Password is required.")
            .isLength({ min: 6, max: 20 })
            .withMessage("Password must be between 6 and 20 characters long.")
            .matches(/^[a-zA-Z0-9@.#$!%*?&^]+$/)
            .withMessage(
                "Password can only contain alphabetic, numeric, and special characters."
            )
            .escape(),

        check("repassword")
            .notEmpty()
            .withMessage("Re-password is required.")
            .isLength({ min: 6, max: 20 })
            .withMessage(
                "Re-password must be between 6 and 20 characters long."
            )
            .matches(/^[a-zA-Z0-9@.#$!%*?&^]+$/)
            .withMessage(
                "Re-password can only contain alphabetic, numeric, and special characters."
            )
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Password and repassword do not match");
                }
                return true;
            })
            .escape(),
    ];
};

module.exports = {
    validateRegister: validateRegister(),
};
