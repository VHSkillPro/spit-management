const express = require("express");
const db = require("../../models");
const bcrypt = require("bcrypt");
const { generateAT, generateRT, verifyRT } = require("../../utils/jwt");
const { validationResult } = require("express-validator");
const HTTP_STATUS_CODE = require("../../utils/httpStatusCode");

/**
 * Function to handle user login process.
 *
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Object} The response object with user information and tokens.
 */
const login = async (req, res) => {
    try {
        // Handle form errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                status: "error",
                message: "Tên tài khoản và mật khẩu không được trống",
            });
        }

        // Get user from database
        const { username, password } = req.body;
        let user = await db.User.findOne({ where: { username: username } });

        // Check user is not exist or password incorrect
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
                status: "error",
                message: "Tên đăng nhập hoặc mật khẩu không chính xác",
            });
        }

        // Generator accessToken and refreshToken
        const payload = {
            username: user.username,
        };

        const accessToken = generateAT(payload);
        const refreshToken = generateRT(payload);

        // Update refreshToken in database
        await db.User.update(
            { refreshToken: refreshToken },
            {
                where: {
                    username: user.username,
                },
            }
        );

        // Return response
        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            data: {
                username: user.username,
                accessToken: {
                    token: accessToken,
                    expired: parseInt(process.env.AT_LIFE),
                },
                refreshToken: {
                    token: refreshToken,
                    expired: parseInt(process.env.RT_LIFE),
                },
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
 * Register a new user with the provided username and password.
 *
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @returns {Object} - Returns a response with status and message
 */
const register = async (req, res) => {
    try {
        // Handle form errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
                status: "error",
                message: "Invalid request data.",
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
            data: {
                username: username,
                password: password,
            },
            message: "Register successfully.",
        });
    } catch (error) {
        console.log(error);

        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: "Internal Server Error.",
        });
    }
};

/**
 * Retrieves the current user's information and sends a success response with the user's username.
 *
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Object} The response object with status, data (containing username), and message.
 */
const me = async (req, res) => {
    return res.status(HTTP_STATUS_CODE.OK).send({
        status: "success",
        data: {
            username: req.user.username,
        },
        message: "Get user successfully.",
    });
};

/**
 * Function to refresh access token based on the provided refresh token.
 *
 * @param {express.Request} req - The request object containing the refresh token in the body.
 * @param {express.Response} res - The response object to send back the new access token and refresh token.
 * @returns {Object} - Returns a response with the new access token and refresh token if successful,
 * or an error response if any issues occur during the process.
 */
const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
                status: "error",
                message: "Invalid request data.",
            });
        }

        const verified = verifyRT(refreshToken);
        if (!verified) {
            return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
                status: "error",
                message: "Invalid or expired refresh token.",
            });
        }

        const user = await db.User.findOne({
            where: { refreshToken: refreshToken },
        });
        if (!user) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({
                status: "error",
                message: "Refresh token not found.",
            });
        }

        // Generator accessToken and refreshToken
        const payload = {
            username: user.username,
        };

        const newAccessToken = generateAT(payload);
        const newRefreshToken = generateRT(payload);

        // Update refreshToken in database
        await db.User.update(
            { refreshToken: newRefreshToken },
            {
                where: {
                    username: user.username,
                },
            }
        );

        // Return response
        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            data: {
                username: user.username,
                accessToken: {
                    token: newAccessToken,
                    expired: parseInt(process.env.AT_LIFE),
                },
                refreshToken: {
                    token: newRefreshToken,
                    expired: parseInt(process.env.RT_LIFE),
                },
            },
            message: "Refresh access token successfully.",
        });
    } catch (error) {
        console.log(error);

        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: "Internal Server Error.",
        });
    }
};

/**
 * Logs out a user by invalidating the refresh token associated with the request.
 *
 * @param {express.Request} req - The request object containing the refresh token in the body.
 * @param {express.Response} res - The response object to send the result of the logout operation.
 * @returns {Object} - Returns a JSON response indicating the status of the logout operation.
 */
const logout = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
                status: "error",
                message: "Invalid request data.",
            });
        }

        const verified = verifyRT(refreshToken);
        if (!verified) {
            return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
                status: "error",
                message: "Invalid or expired refresh token.",
            });
        }

        const user = await db.User.findOne({
            where: { refreshToken: refreshToken },
        });
        if (!user) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({
                status: "error",
                message: "Refresh token not found.",
            });
        }

        // Delete refreshToken in database
        await db.User.update(
            { refreshToken: null },
            {
                where: {
                    username: user.username,
                },
            }
        );

        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            message: "Logged out successfully.",
        });
    } catch (error) {
        console.log(error);

        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: "Internal Server Error.",
        });
    }
};

module.exports = {
    login,
    register,
    me,
    refreshAccessToken,
    logout,
};
