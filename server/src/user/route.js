const express = require("express");
const router = express.Router();
const service = require("./service");
const validate = require("./validate");
const { checkPermission } = require("../auth/middleware");

/**
 * API lấy tất cả users trong hệ thống
 * @path /api/v1/users
 * @query
 * - username: string (Optional)
 * - roleId: int (Optional)
 * - offset: int (Optional)
 * - limit: int (Optional)
 * @method GET
 */
router.get(
    "/",
    checkPermission("user.index"),
    validate.validateQueryUserIndex,
    service.index
);

/**
 * API lấy thông tin user theo username
 * @path /api/v1/users/:username
 * @method GET
 */
router.get("/:username", checkPermission("user.show"), service.show);

/**
 * API tạo user mới
 * @path /api/v1/users
 * @method POST
 */
router.post(
    "/",
    checkPermission("user.create"),
    validate.validateRegister,
    service.create
);

/**
 * API cập nhật thông tin user
 * @path /api/v1/users/:username
 * @method PATCH
 * @body
 * - password: string (Optional)
 * - roleId: int (Optional)
 */
router.patch(
    "/:username",
    checkPermission("user.update"),
    validate.validateUpdateUser,
    service.update
);

/**
 * API xóa user
 * @path /api/v1/users/:username
 * @method DELETE
 */
router.delete("/:username", checkPermission("user.destroy"), service.destroy);

module.exports = router;
