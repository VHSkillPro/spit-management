const express = require("express");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const AppError = require("../../utils/AppError");
const authService = require("./authService");
const authMessage = require("./authMessage");
const { generateAT, generateRT, verifyRT } = require("../../utils/jwt");
const db = require("../../models");

/**
 * API đăng nhập
 * @path /api/v1/auth/login
 * @method POST
 * @body
 * - username: string
 * - password: string
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await authService.getUserByUsername(username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(
                new AppError(StatusCodes.UNAUTHORIZED, authMessage.LOGIN_FAIL)
            );
        }

        // Tạo ra accessToken và refreshToken
        const payload = {
            user: {
                username: user.username,
                roleId: user.roleId,
            },
        };

        const accessToken = generateAT(payload);
        const refreshToken = generateRT(payload);

        // Cập nhập refreshToken vào database
        await db.sequelize.transaction(async (t) => {
            user.refreshToken = refreshToken;
            await user.save();
        });

        return res.status(StatusCodes.OK).send({
            data: {
                access_token: accessToken,
                refresh_token: refreshToken,
            },
            message: authMessage.LOGIN_SUCCESS,
        });
    } catch (error) {
        console.log(error);
        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

/**
 * API lấy thông tin người dùng
 * @path /api/v1/auth/me
 * @method GET
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const me = async (req, res, next) => {
    try {
        return res.status(StatusCodes.OK).send({
            data: {
                user: req.user,
            },
            message: authMessage.GET_USER_SUCCESS,
        });
    } catch (error) {
        console.log(error);
        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

/**
 * API làm mới accessToken và refreshToken
 * @path /api/v1/auth/refresh_tokens
 * @method POST
 * @header Authorization: Bearer <refresh_token>
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const refreshTokens = async (req, res, next) => {
    try {
        // Lấy refreshToken đính kèm trong header
        const authHeader = req.headers["authorization"];
        const refreshToken = authHeader && authHeader.split(" ")[1];

        // Kiểm tra refreshToken có tồn tại và hợp lệ không
        const verified = refreshToken ? verifyRT(refreshToken) : false;
        if (!refreshToken || !verified) {
            return next(
                new AppError(StatusCodes.UNAUTHORIZED, authMessage.UNAUTHORIZED)
            );
        }

        // Tìm kiếm user cần cấp lại accessToken
        const user = await db.User.findOne({
            where: { refreshToken: refreshToken },
        });

        // Nếu không tìm thấy user
        if (!user) {
            return next(
                new AppError(StatusCodes.UNAUTHORIZED, authMessage.UNAUTHORIZED)
            );
        }

        // Tạo lại accessToken và refreshToken
        const payload = {
            user: {
                username: user.username,
                roleId: user.roleId,
            },
        };

        const newAccessToken = generateAT(payload);
        const newRefreshToken = generateRT(payload);

        // Cập nhật refreshToken vào database
        await db.sequelize.transaction(async (t) => {
            user.refreshToken = newRefreshToken;
            await user.save();
        });

        // Trả về thông báo làm mới token thành công
        return res.status(StatusCodes.OK).send({
            data: {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
            },
            message: authMessage.REFRESH_TOKEN_SUCCESS,
        });
    } catch (error) {
        console.log(error);
        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

/**
 * API đăng xuất
 * @path /api/v1/auth/logout
 * @method POST
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const logout = async (req, res, next) => {
    try {
        // Xoá refreshToken của người dùng hiện tại trong database
        await authService.updateRefreshToken(req.user.username, null);

        // Trả về thông báo đăng xuất thành công
        return res.status(StatusCodes.OK).send({
            message: authMessage.LOGOUT_SUCCESS,
        });
    } catch (error) {
        console.log(error);
        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

module.exports = {
    me,
    login,
    refreshTokens,
    logout,
};
