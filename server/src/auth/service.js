const express = require("express");
const db = require("../../models");
const bcrypt = require("bcrypt");
const { generateAT, generateRT, verifyRT } = require("../../utils/jwt");
const { validationResult } = require("express-validator");
const HTTP_STATUS_CODE = require("../../utils/httpStatusCode");

/**
 * API đăng nhập
 *
 * @path /api/v1/auth/login
 * @method POST
 * @param {express.Request} req
 * @param {express.Response} res
 */
const login = async (req, res) => {
    try {
        // Kiểm tra tính đúng đắn của dữ liệu
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                status: "error",
                message: "Tên tài khoản và mật khẩu không được trống",
            });
        }

        // Lấy user từ database
        const { username, password } = req.body;
        let user = await db.User.findOne({ where: { username: username } });

        // Nếu user không tồn tại hoặc sai mật khẩu
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
                status: "error",
                message: "Tên đăng nhập hoặc mật khẩu không chính xác",
            });
        }

        // Tạo ra accessToken và refreshToken
        const payload = {
            username: user.username,
            roleId: user.roleId,
        };

        const accessToken = generateAT(payload);
        const refreshToken = generateRT(payload);

        // Cập nhập refreshToken vào database
        await db.sequelize.transaction(async (t) => {
            await db.User.update(
                { refreshToken: refreshToken },
                {
                    where: {
                        username: user.username,
                    },
                }
            );
        });

        // Trả về thông báo đăng nhập thành công
        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            data: {
                access_token: accessToken,
                refresh_token: refreshToken,
            },
            message: "Đăng nhập thành công",
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
 * API trả về thông tin người dùng hiện tại
 *
 * URI: /api/v1/auth/me
 *
 * Method: GET
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const me = async (req, res) => {
    try {
        // Trả về thông tin người dùng hiện tại
        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            data: {
                username: req.username,
                roleId: req.roleId,
            },
            message: "Get user successfully",
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
 * API dùng để cấp lại accessToken dựa vào refreshToken
 *
 * URI: /api/v1/auth/refresh_tokens
 *
 * Method: POST
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const refreshTokens = async (req, res) => {
    try {
        // Lấy refreshToken đính kèm trong header
        const authHeader = req.headers["authorization"];
        const refreshToken = authHeader && authHeader.split(" ")[1];

        // Nếu request không đính kèm refreshToken
        if (!refreshToken) {
            return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
                status: "error",
                message: "Không tìm thấy refresh token",
            });
        }

        // Kiểm tra tính hợp lệ của refreshToken
        const verified = verifyRT(refreshToken);
        if (!verified) {
            return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
                status: "error",
                message: "Refresh token hết hạn hoặc không hợp lệ",
            });
        }

        // Tìm kiếm user cần cấp lại accessToken
        const user = await db.User.findOne({
            where: { refreshToken: refreshToken },
        });

        if (!user) {
            return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
                status: "error",
                message: "Refresh token hết hạn hoặc không hợp lệ",
            });
        }

        // Tạo lại accessToken và refreshToken
        const payload = {
            username: user.username,
            roleId: user.roleId,
        };

        const newAccessToken = generateAT(payload);
        const newRefreshToken = generateRT(payload);

        // Cập nhật refreshToken vào database
        await db.sequelize.transaction(async (t) => {
            await db.User.update(
                { refreshToken: newRefreshToken },
                {
                    where: {
                        username: user.username,
                    },
                }
            );
        });

        // Trả về thông báo làm mới token thành công
        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            data: {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
            },
            message: "Làm mới tokens thành công",
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
 * API dùng để logout người dùng hiện tại
 *
 * URI: /api/v1/auth/logout
 *
 * Method: POST
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const logout = async (req, res) => {
    try {
        // Xoá refreshToken của người dùng hiện tại trong database
        await db.sequelize.transaction(async (t) => {
            await db.User.update(
                { refreshToken: null },
                {
                    where: {
                        username: req.username,
                    },
                }
            );
        });

        // Trả về thông báo đăng xuất thành công
        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            message: "Đăng xuất thành công",
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
    me,
    refreshTokens,
    login,
    logout,
};
