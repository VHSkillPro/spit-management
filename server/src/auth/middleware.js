const express = require("express");
const HTTP_STATUS_CODE = require("../../utils/httpStatusCode");
const { verifyAT } = require("../../utils/jwt");
const db = require("../../models");

/**
 * Middleware kiểm tra authenticated.
 *
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
            return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
                status: "error",
                message: "Truy cập trái phép",
            });
        }

        // Kiểm tra tính hợp lệ của accessToken
        const verified = verifyAT(accessToken);
        if (!verified) {
            return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
                status: "error",
                message: "Truy cập trái phép",
            });
        }

        // Đính thông tin về người dùng trong request
        req.username = verified.username;
        req.roleId = verified.roleId;

        req.user = {
            username: verified.username,
            roleId: verified.roleId,
        };

        // Đưa request tới tác vụ tiếp theo
        return next();
    } catch (error) {
        console.log(error);

        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: "Lỗi máy chủ",
        });
    }
};

/**
 * Middleware kiểm tra quyền truy cập
 *
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
            if (req.roleId === 1) {
                return next();
            }

            // Lấy quyền trong database
            const rolePermission = await db.Role.findOne({
                where: {
                    id: req.roleId,
                    "$permissions.route$": permission,
                },
                include: "permissions",
            });

            // Nếu không có quyền
            if (!rolePermission) {
                return res.status(HTTP_STATUS_CODE.FORBIDDEN).send({
                    status: "error",
                    message: "Không có quyền truy cập",
                });
            }

            return next();
        } catch (error) {
            console.log(error);

            return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
                status: "error",
                message: "Lỗi máy chủ",
            });
        }
    };
};

module.exports = {
    isAuthenticated,
    checkPermission,
};
