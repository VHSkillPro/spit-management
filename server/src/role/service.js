const express = require("express");
const db = require("../../models");
const HTTP_STATUS_CODE = require("../../utils/httpStatusCode");

/**
 * API trả về danh sách roles
 * @path /api/v1/roles
 * @method GET
 * @param {express.Request} req
 * @param {express.Response} res
 */
const index = async (req, res) => {
    try {
        // Lấy tất cả roles từ database
        const roles = await db.Role.findAll();

        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            data: {
                roles: roles,
            },
            message: "Lấy tất cả chức vụ thành công",
        });
    } catch (error) {
        console.log(error);

        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: "Lỗi máy chủ",
        });
    }
};

/**
 * API trả về thông tin của role
 * @path /api/v1/roles/:roleId
 * @method GET
 * @param {express.Request} req
 * @param {express.Response} res
 */
const show = async (req, res) => {
    try {
        // Lấy tất cả roles từ database
        const roleId = req.params.roleId;
        const role = await db.Role.findOne({ where: { id: roleId } });

        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            data: {
                role: role,
            },
            message: "Lấy thông tin chức vụ thành công",
        });
    } catch (error) {
        console.log(error);

        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: "Lỗi máy chủ",
        });
    }
};

/**
 * API thêm role mới và hệ thống
 * @path /api/v1/roles
 * @method POST
 * @param {express.Request} req
 * @param {express.Response} res
 */
const create = async (req, res) => {
    try {
        // Thêm role vào database
        await db.sequelize.transaction(async (t) => {
            const roleName = req.body.name;

            await db.Role.create({
                name: roleName,
            });
        });

        return res.status(HTTP_STATUS_CODE.CREATED).send({
            status: "success",
            message: "Thêm role thành công",
        });
    } catch (error) {
        console.log(error);

        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: "Lỗi máy chủ",
        });
    }
};

/**
 * API cập nhật thông tin của role
 *
 * @path /api/v1/roles/:roleId
 * @method PATCH
 * @param {express.Request} req
 * @param {express.Response} res
 */
const update = async (req, res) => {
    try {
        // Lấy role cần chỉnh sửa
        const roleId = req.params.roleId;

        // Kiểm tra xem role có phải là admin không
        if (roleId == 1) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
                status: "error",
                message: "Không thể chỉnh sửa chức vụ này",
            });
        }

        // Kiểm tra xem role có tồn tại không
        const role = await db.Role.findOne({ where: { id: roleId } });

        if (!role) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({
                status: "error",
                message: "Không tìm thấy tài nguyên",
            });
        }

        // Chỉnh sửa thông tin role
        await db.sequelize.transaction(async (t) => {
            const roleName = req.body.name;

            role.name = roleName;
            await role.save();
        });

        return res.status(HTTP_STATUS_CODE.CREATED).send({
            status: "success",
            message: "Chỉnh sửa thông tin thành công",
        });
    } catch (error) {
        console.log(error);

        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: "Lỗi máy chủ",
        });
    }
};

/**
 * API xóa role khỏi hệ thống
 *
 * @path /api/v1/roles/:roleId
 * @method DELETE
 * @param {express.Request} req
 * @param {express.Response} res
 */
const destroy = async (req, res) => {
    try {
        // Lấy role cần xóa
        const roleId = req.params.roleId;

        // Kiểm tra xem role có phải là admin không
        if (roleId == 1) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
                status: "error",
                message: "Không thể xóa chức vụ này",
            });
        }

        const role = await db.Role.findOne({ where: { id: roleId } });

        // Kiểm tra xem role có tồn tại không
        if (!role) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({
                status: "error",
                message: "Không tìm thấy tài nguyên",
            });
        }

        // Kiểm tra xem role có người dùng đang sử dụng không
        const users = await db.User.findOne({
            where: {
                roleId: roleId,
            },
        });

        if (users) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
                status: "error",
                message:
                    "Không thể xóa chức vụ này vì có người dùng đang sử dụng",
            });
        }

        // Xóa role và các dữ liệu liên quan khỏi database
        await db.sequelize.transaction(async (t) => {
            await role.destroy();
        });

        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            message: "Xóa chức vụ thành công",
        });
    } catch (error) {
        console.log(error);

        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: "Lỗi máy chủ",
        });
    }
};

/**
 * API lấy danh sách quyền của role
 * @path /api/v1/roles/:roleId/permissions
 * @method GET
 * @param {express.Request} req
 * @param {express.Response} res
 */
const permissions = async (req, res) => {
    try {
        // Lấy role từ database
        const role = await db.Role.findOne({
            where: {
                id: req.params.roleId,
            },
            include: "permissions",
        });

        // Kiểm tra xem role có tồn tại không
        if (!role) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({
                status: "error",
                message: "Không tìm thấy tài nguyên",
            });
        }

        // Lấy danh sách quyền của role
        const permissions = role.permissions.map((permission) => {
            return {
                id: permission.id,
                name: permission.name,
                route: permission.route,
            };
        });

        // Trả về kết quả
        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            data: {
                permissions: permissions,
            },
            message: "Lấy danh sách quyền của role thành công",
        });
    } catch (error) {
        console.log(error);

        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: "Lỗi máy chủ",
        });
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    permissions,
};
