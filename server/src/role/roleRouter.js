// const express = require("express");
// const router = express.Router();
// const roleHandler = require("./roleHandler");
// const roleValidator = require("./roleValidator");
// const authMiddleware = require("../auth/authMiddleware");

// /**
//  * API lấy danh sách role
//  * @path /api/v1/roles
//  * @method GET
//  */
// router.get(
//     "/",
//     authMiddleware.checkPermission("role.index"),
//     roleHandler.index
// );

// /**
//  * API lấy thông tin role
//  * @path /api/v1/roles/:roleId
//  * @method GET
//  */
// router.get(
//     "/:roleId",
//     authMiddleware.checkPermission("role.show"),
//     roleHandler.show
// );

// /**
//  * API tạo mới role
//  * @path /api/v1/roles
//  * @method POST
//  */
// router.post(
//     "/",
//     authMiddleware.checkPermission("role.create"),
//     roleValidator.validateCreateRole,
//     roleHandler.create
// );

// // /**
// //  * API cập nhật thông tin role
// //  * @path /api/v1/roles/:roleId
// //  * @method PATCH
// //  */
// // router.patch(
// //     "/:roleId",
// //     checkPermission("role.update"),
// //     validate.validateUpdateRole,
// //     service.update
// // );

// /**
//  * API xóa role khỏi hệ thống
//  * @path /api/v1/roles/:roleId
//  * @method DELETE
//  */
// router.delete(
//     "/:roleId",
//     authMiddleware.checkPermission("role.destroy"),
//     roleHandler.destroy
// );

// /**
//  * API lấy danh sách quyền của role
//  * @path /api/v1/roles/:roleId/permissions
//  * @method GET
//  */
// router.get("/:roleId/permissions", roleHandler.permissions);

// module.exports = router;
