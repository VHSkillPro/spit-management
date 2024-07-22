const express = require("express");
const router = express.Router();
const service = require("./service");
const validate = require("./validate");
const { checkPermission } = require("../auth/middleware");

/**
 * API lấy danh sách role
 * @path /api/v1/roles
 * @method GET
 */
router.get("/", checkPermission("role.index"), service.index);

/**
 * API tạo mới role
 * @path /api/v1/roles
 * @method POST
 */
router.post(
    "/",
    checkPermission("role.create"),
    validate.validateCreateRole,
    service.create
);

/**
 * API cập nhật thông tin role
 * @path /api/v1/roles/:roleId
 * @method PATCH
 */
router.patch(
    "/:roleId",
    checkPermission("role.update"),
    validate.validateUpdateRole,
    service.update
);

/**
 * API xóa role khỏi hệ thống
 * @path /api/v1/roles/:roleId
 * @method DELETE
 */
router.delete("/:roleId", checkPermission("role.destroy"), service.destroy);

module.exports = router;
