const express = require("express");
const { StatusCodes } = require("http-status-codes");
const roleService = require("./roleService");
const roleMessage = require("./roleMessage");
const userServices = require("../user/userService");
const AppError = require("../../utils/AppError");
const db = require("../../models");

/**
 * API trả về danh sách roles
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const index = async (req, res, next) => {
    try {
        // Lấy tất cả roles từ database
        const roles = await roleService.getAllRoles();

        return res.status(StatusCodes.OK).send({
            data: {
                roles: roles,
            },
            message: roleMessage.INDEX,
        });
    } catch (error) {
        console.log(error);
        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

/**
 * API trả về thông tin của role
 * @path /api/v1/roles/:roleId
 * @method GET
 * @param {express.Request} req
 * @param {string} req.params.roleId - Id của role cần lấy thông tin
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const show = async (req, res, next) => {
    try {
        // Lấy tất cả roles từ database
        const roleId = req.params.roleId;
        const role = await roleService.getRoleById(roleId);

        if (!role) {
            return next(
                new AppError(StatusCodes.NOT_FOUND, roleMessage.NOT_FOUND)
            );
        }

        return res.status(StatusCodes.OK).send({
            data: {
                role: role,
            },
            message: roleMessage.SHOW,
        });
    } catch (error) {
        console.log(error);
        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

/**
 * API thêm role mới và hệ thống
 * @path /api/v1/roles
 * @method POST
 * @param {express.Request} req
 * @param {string} req.body.roleId - Id của role cần tạo
 * @param {string} req.body.roleName - Tên của role cần tạo
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const create = async (req, res, next) => {
    try {
        const roleId = req.body.roleId;
        const roleName = req.body.roleName;

        // Kiểm tra xem role đã tồn tại chưa
        const role = await roleService.getRoleById(roleId);
        if (role) {
            return next(
                new AppError(StatusCodes.CONFLICT, roleMessage.EXISTED)
            );
        }

        // Thêm role vào database
        await roleService.createRole(roleId, roleName);

        return res.status(StatusCodes.CREATED).send({
            message: roleMessage.CREATE,
        });
    } catch (error) {
        console.log(error);
        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

// /**
//  * API cập nhật thông tin của role
//  *
//  * @path /api/v1/roles/:roleId
//  * @method PATCH
//  * @param {express.Request} req
//  * @param {express.Response} res
//  */
// const update = async (req, res) => {
//     try {
//         // Lấy role cần chỉnh sửa
//         const roleId = req.params.roleId;

//         // Kiểm tra xem role có phải là admin không
//         if (roleId == 1) {
//             return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
//                 status: "error",
//                 message: "Không thể chỉnh sửa chức vụ này",
//             });
//         }

//         // Kiểm tra xem role có tồn tại không
//         const role = await db.Role.findOne({ where: { id: roleId } });

//         if (!role) {
//             return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({
//                 status: "error",
//                 message: "Không tìm thấy tài nguyên",
//             });
//         }

//         // Chỉnh sửa thông tin role
//         await db.sequelize.transaction(async (t) => {
//             const roleName = req.body.name;

//             role.name = roleName;
//             await role.save();
//         });

//         return res.status(HTTP_STATUS_CODE.CREATED).send({
//             status: "success",
//             message: "Chỉnh sửa thông tin thành công",
//         });
//     } catch (error) {
//         console.log(error);

//         return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
//             status: "error",
//             message: "Lỗi máy chủ",
//         });
//     }
// };

/**
 * API xóa role khỏi hệ thống
 * @path /api/v1/roles/:roleId
 * @method DELETE
 * @param {express.Request} req
 * @param {string} req.params.roleId - Role cần xóa
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const destroy = async (req, res, next) => {
    try {
        // Lấy role cần xóa
        const roleId = req.params.roleId;
        const role = await roleService.getRoleById(roleId);

        // Kiểm tra xem role có tồn tại không
        if (!role) {
            return next(
                new AppError(StatusCodes.NOT_FOUND, roleMessage.NOT_FOUND)
            );
        }

        // Kiểm tra xem role có phải là root không
        if (role.isRoot) {
            return next(
                new AppError(
                    StatusCodes.BAD_REQUEST,
                    roleMessage.DONT_DELETE_ROOT
                )
            );
        }

        // Kiểm tra xem role có người dùng đang sử dụng không
        const users = await userServices.getUsersByRoleId(roleId);

        if (users && users.length > 0) {
            return next(
                new AppError(StatusCodes.BAD_REQUEST, roleMessage.IS_USED)
            );
        }

        // Xóa role và các dữ liệu liên quan khỏi database
        await db.sequelize.transaction(async (t) => {
            await role.destroy();
        });

        return res.status(StatusCodes.OK).send({
            message: roleMessage.DESTROY,
        });
    } catch (error) {
        console.log(error);
        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

/**
 * API lấy danh sách quyền của role
 * @param {express.Request} req
 * @param {string} req.params.roleId - Role cần lấy danh sách quyền
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const permissions = async (req, res, next) => {
    try {
        const roleId = req.params.roleId;
        const permissions = await roleService.getPermissionsOfRole(roleId);

        // Kiểm tra xem role có tồn tại không
        if (!permissions) {
            return next(
                new AppError(StatusCodes.NOT_FOUND, roleMessage.NOT_FOUND)
            );
        }

        // Trả về kết quả
        return res.status(StatusCodes.OK).send({
            data: {
                permissions: permissions,
            },
            message: roleMessage.GET_PERMISSIONS,
        });
    } catch (error) {
        console.log(error);
        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

module.exports = {
    index,
    show,
    create,
    // update,
    destroy,
    permissions,
};
