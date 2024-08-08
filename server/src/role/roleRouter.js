const express = require("express");
const router = express.Router();
const roleHandler = require("./roleHandler");
const roleValidator = require("./roleValidator");
const authMiddleware = require("../auth/authMiddleware");

router.get(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("role.index"),
    roleHandler.index
);

router.get(
    "/:roleId",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("role.show"),
    roleHandler.show
);

router.post(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("role.create"),
    roleValidator.validateCreateRole,
    roleHandler.create
);

router.patch(
    "/:roleId",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("role.update"),
    roleValidator.validateUpdateRole,
    roleHandler.update
);

router.delete(
    "/:roleId",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("role.destroy"),
    roleHandler.destroy
);

// /**
//  * API lấy danh sách quyền của role
//  * @path /api/v1/roles/:roleId/permissions
//  * @method GET
//  */
// router.get("/:roleId/permissions", roleHandler.permissions);

module.exports = router;
