const { body } = require("express-validator");
const { validationResult } = require("../../utils/validators");
const permissionService = require("../permission/permissionService");

const validateCreateRole = [
    body("id").notEmpty().isString(),
    body("name").notEmpty().isString(),
    validationResult,
];

const validateUpdateRole = [
    body("name").optional().isString(),
    body("permissions")
        .optional()
        .isArray()
        .custom(async (value) => {
            const allPermissions = await permissionService.getAllPermissions();
            const idPermissions = allPermissions.map(
                (permission) => permission.id
            );

            const ok = value.every((permission) => {
                if (typeof permission !== "string") return false;
                return idPermissions.includes(permission);
            });

            if (!ok) throw new Error();
            return true;
        }),
    validationResult,
];

module.exports = {
    validateCreateRole,
    validateUpdateRole,
};
