const express = require("express");
const HTTP_STATUS_CODE = require("../../utils/httpStatusCode");
const { verifyAT } = require("../../utils/jwt");

/**
 * Middleware function to check authenticated.
 *
 * @async
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @param {express.NextFunction} next - The next middleware function
 */
const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const accessToken = authHeader && authHeader.split(" ")[1];

        if (!accessToken) {
            return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
                status: "error",
                message: "Truy cập trái phép",
            });
        }

        const verified = verifyAT(accessToken);
        if (!verified) {
            return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
                status: "error",
                message: "Truy cập trái phép",
            });
        }

        req.username = verified.username;
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
