const express = require("express");
const db = require("../../models");
const HTTP_STATUS_CODE = require("../../utils/httpStatusCode");
const { verifyAT } = require("../../utils/jwt");

/**
 * Middleware function to check if the user is authenticated based on the access token in the request cookies.
 * If the access token is missing, invalid, or the user does not exist, it sends an unauthorized response.
 * If the user is authenticated, it attaches the user object to the request and calls the next middleware.
 *
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @param {express.NextFunction} next - The next middleware function
 * @returns {Promise<void>} - Promise that resolves when the authentication check is completed
 */
const isAuthenticated = async (req, res, next) => {
    const accessToken = req.cookies["access_token"];

    if (!accessToken) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
            status: "error",
            message: "Unauthorized access.",
        });
    }

    const verified = verifyAT(accessToken);
    if (!verified) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
            status: "error",
            message: "Unauthorized access.",
        });
    }

    const user = await db.User.findOne({
        where: { username: verified.username },
    });

    if (!user) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
            status: "error",
            message: "Unauthorized access.",
        });
    }

    req.user = user;
    return next();
};

module.exports = {
    isAuthenticated,
};
