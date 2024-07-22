const express = require("express");
const db = require("../../models");
const bcrypt = require("bcrypt");
const HTTP_STATUS_CODE = require("../../utils/httpStatusCode");
const { Op } = require("sequelize");

/**
 * API lấy tất cả users trong hệ thống
 * @path /api/v1/users
 * @query
 * - username: string (Optional)
 * - roleId: int (Optional)
 * - offset: int (Optional)
 * - limit: int (Optional)
 * @method GET
 * @param {express.Request} req
 * @param {express.Response} res
 */
const index = async (req, res) => {
    try {
        // Lấy tất cả users trong database
        const options = {
            include: "role",
            where: {},
        };

        if (req.query.username) {
            options.where.username = {
                [Op.like]: "%" + req.query.username + "%",
            };
        }

        if (req.query.roleId) {
            options.where.roleId = req.query.roleId;
        }

        if (req.query.limit) {
            options.limit = req.query.limit;
        }

        if (req.query.offset) {
            options.offset = req.query.offset;
        }

        const users = await db.User.findAll(options);

        // Trả dữ liệu về cho client
        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            data: {
                users: users,
                total: await db.User.count(),
            },
            message: "Lấy tất cả users thành công",
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
 *  API thêm một user mới vào hệ thông
 * @path /api/v1/users
 * @method POST
 * @param {express.Request} req
 * @param {express.Response} res
 */
const create = async (req, res) => {
    try {
        // Kiểm tra username đã tồn tại
        const { username, password } = req.body;
        const user = await db.User.findOne({ where: { username: username } });

        if (user) {
            return res.status(HTTP_STATUS_CODE.CONFLICT).send({
                status: "error",
                message: "Tên tài khoản đã tồn tại",
            });
        }

        // Mã hoá mật khẩu
        const saltRounds = 10;
        const hashPassword = bcrypt.hashSync(password, saltRounds);

        // Thêm user mới vào database
        await db.sequelize.transaction(async (t) => {
            await db.User.create({
                username: username,
                password: hashPassword,
                roleId: 1,
                refreshToken: null,
            });
        });

        // Đăng ký thành công, trả về thông báo
        return res.status(HTTP_STATUS_CODE.CREATED).send({
            status: "success",
            message: "Đăng ký tài khoản thành công",
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
 * API cập nhật thông tin (mật khẩu, chức vụ) của user
 * @path /api/v1/users/:username
 * @method PATCH
 * @param {express.Request} req
 * @param {express.Response} res
 */
const update = async (req, res) => {
    try {
        // Lấy user cần đổi mật khẩu
        const username = req.params.username;
        const user = await db.User.findOne({ where: { username: username } });

        // User không tồn tại
        if (!user) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({
                status: "error",
                message: "Không tìm thấy tài nguyên",
            });
        }

        // Nếu có mật khẩu mới
        if (req.body.password) {
            // Mã hoá mật khẩu
            const saltRounds = 10;
            const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);

            // Đổi mật khẩu
            user.password = hashPassword;
        }

        // Nếu có roleId mới
        if (req.body.roleId) {
            const role = db.Role.findOne({
                where: { id: req.body.roleId },
            });

            if (!role) {
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
                    status: "error",
                    message: "Request không hợp lệ",
                });
            }

            user.roleId = req.body.roleId;
        }

        // Cập nhật vào database
        await db.sequelize.transaction(async (t) => {
            await user.save();
        });

        // Trả về thông báo xoá thành công
        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            message: "Cập nhật thông tin thành công",
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
 * API xoá một user được chỉ định
 *
 * @path /api/v1/users/:username
 * @method DELETE
 * @param {express.Request} req
 * @param {express.Response} res
 */
const destroy = async (req, res) => {
    try {
        // Tên tài khoản cần xoá
        const username = req.params.username;

        // Nếu tài khoản bị xoá trùng với tài khoản gởi yêu cầu
        if (username === req.username) {
            return res.status(HTTP_STATUS_CODE.CONFLICT).send({
                status: "error",
                message: "Không thể xoá tài khoản này",
            });
        }

        await db.sequelize.transaction(async (t) => {
            // Xoá user trong database
            const user = await db.User.destroy({
                where: { username: username },
            });

            // User không tồn tại
            if (!user) {
                return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({
                    status: "error",
                    message: "Không tìm thấy tài nguyên",
                });
            }

            // Trả về thông báo xoá thành công
            return res.status(HTTP_STATUS_CODE.OK).send({
                status: "success",
                message: "Xoá tài khoản thành công",
            });
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
    destroy,
};
