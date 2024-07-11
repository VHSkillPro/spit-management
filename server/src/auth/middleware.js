const express = require("express");
const HTTP_STATUS_CODE = require("../../utils/httpStatusCode");
const { verifyAT } = require("../../utils/jwt");

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

module.exports = {
    isAuthenticated,
};
