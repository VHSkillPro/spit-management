const express = require("express");
const db = require("../../models");
const HTTP_STATUS_CODE = require("../../utils/httpStatusCode");

/**
 * API trả về danh sách role
 *
 * @path /api/v1/roles
 * @method GET
 * @param {express.Request} req
 * @param {express.Response} res
 */
const index = async (req, res) => {
    try {
        const roles = await db.Role.findAll();

        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            data: {
                roles: roles,
            },
            message: "Lấy tất cả roles thành công",
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
 *
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

module.exports = {
    index,
    create,
    update,
};
