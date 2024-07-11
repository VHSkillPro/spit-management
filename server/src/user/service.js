const express = require("express");
const db = require("../../models");
const HTTP_STATUS_CODE = require("../../utils/httpStatusCode");
const { validationResult } = require("express-validator");

/**
 * API trả về danh sách users
 *
 * URI: /api/v1/users
 *
 * Method: GET
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const index = async (req, res) => {
    try {
        // Lấy tất cả users
        const users = await db.User.findAll();

        // Trả dữ liệu về cho client
        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            data: {
                users: users,
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

const create = async (req, res) => {
    try {
        // Handle form errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
                status: "error",
                message: "Request không hợp lệ",
            });
        }

        // Check username is exist
        const { username, password } = req.body;
        const user = await db.User.findOne({ where: { username: username } });

        if (user) {
            return res.status(HTTP_STATUS_CODE.CONFLICT).send({
                status: "error",
                message: "Tên tài khoản đã tồn tại",
            });
        }

        // Register successfully
        const saltRounds = 10;
        const hashPassword = bcrypt.hashSync(password, saltRounds);

        // Insert user to database
        await db.User.create({
            username: username,
            password: hashPassword,
            role: 0,
            refreshToken: null,
        });

        // Return response
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
 * API xoá một user được chỉ định
 *
 * URI: /api/v1/users/:username
 *
 * Method: DELETE
 *
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

        // Kiểm tra tài khoản cần xoá có tồn tại ?
        const user = await db.User.findOne({ where: { username: username } });

        if (!user) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({
                status: "error",
                message: "Không tìm thấy tài nguyên",
            });
        }

        // Xoá user trong database
        await db.sequelize.transaction(async (t) => {
            await db.User.destroy({ where: { username: username } });
        });

        // Trả về thông báo xoá thành công
        return res.status(HTTP_STATUS_CODE.NO_CONTENT).send({
            status: "success",
            message: "Xoá tài khoản thành công",
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
    destroy,
};
