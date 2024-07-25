const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { verifyAT } = require("../../utils/jwt");
const AppError = require("../../utils/AppError");
const authMessage = require("./authMessage");
const authService = require("./authService");

/**
 * Middleware kiểm tra authenticated.
 * @header Authorization: Bearer <accessToken | refreshToken>
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const isAuthenticated = async (req, res, next) => {
    try {
        // Lấy accessToken từ header
        const authHeader = req.headers["authorization"];
        const accessToken = authHeader && authHeader.split(" ")[1];

        // Nếu request không đính kèm accessToken
        if (!accessToken) {
            return next(
                new AppError(StatusCodes.UNAUTHORIZED, authMessage.UNAUTHORIZED)
            );
        }

        // Kiểm tra tính hợp lệ của accessToken
        const verified = verifyAT(accessToken);
        if (!verified) {
            return next(
                new AppError(StatusCodes.UNAUTHORIZED, authMessage.UNAUTHORIZED)
            );
        }

        // Đính thông tin về người dùng trong request
        req.user = verified.user;

        // Đưa request tới tác vụ tiếp theo
        return next();
    } catch (error) {
        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

/**
 * Middleware kiểm tra quyền truy cập
 * @param permission - Quyền truy cập cần kiểm tra
 */
const checkPermission = (permission) => {
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    return async (req, res, next) => {
        try {
            // Kiểm tra quyền truy cập
            if (!authService.havePermission(req.user.roleId, permission)) {
                return next(
                    new AppError(StatusCodes.FORBIDDEN, authMessage.FORBIDDEN)
                );
            }

            return next();
        } catch (error) {
            console.log(error);
            return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
        }
    };
};

module.exports = {
    isAuthenticated,
    checkPermission,
};
