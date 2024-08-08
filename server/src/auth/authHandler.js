const express = require("express");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const AppError = require("../../utils/AppError");
const authService = require("./authService");
const userService = require("../user/userService");
const authMessage = require("./authMessage");
const jwt = require("../../utils/jwt");

/**
 * Handler get self information
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
            message: authMessage.GET_ME_SUCCESS,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler login
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await userService.getUserByUsername(username);

        // Check username exist and password correct
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(
                new AppError(StatusCodes.UNAUTHORIZED, authMessage.LOGIN_FAIL)
            );
        }

        // Generate accessToken and refreshToken
        const payload = {
            user: {
                username: user.username,
                roleId: user.roleId,
            },
        };

        const accessToken = jwt.generateAT(payload);
        const refreshToken = jwt.generateRT(payload);

        // Update refresh token
        await userService.updateRefreshToken(username, refreshToken);

        return res.status(StatusCodes.OK).send({
            data: {
                access_token: accessToken,
                refresh_token: refreshToken,
            },
            message: authMessage.LOGIN_SUCCESS,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler refresh tokens
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const refreshTokens = async (req, res, next) => {
    try {
        // Get refreshToken from header
        const authHeader = req.headers["authorization"];
        const refreshToken = authHeader && authHeader.split(" ")[1];

        // Verify refreshToken
        const verified = refreshToken ? jwt.verifyRT(refreshToken) : false;
        if (!refreshToken || !verified) {
            return next(
                new AppError(StatusCodes.UNAUTHORIZED, authMessage.UNAUTHORIZED)
            );
        }

        // Get user by refreshToken
        const user = await userService.getUserByRefreshToken(refreshToken);

        // Check user exist
        if (!user) {
            return next(
                new AppError(StatusCodes.UNAUTHORIZED, authMessage.UNAUTHORIZED)
            );
        }

        // Generate new accessToken and refreshToken
        const payload = {
            user: {
                username: user.username,
                roleId: user.roleId,
            },
        };

        const newAccessToken = jwt.generateAT(payload);
        const newRefreshToken = jwt.generateRT(payload);

        // Update refresh token
        await userService.updateRefreshToken(user.username, newRefreshToken);

        return res.status(StatusCodes.OK).send({
            data: {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
            },
            message: authMessage.REFRESH_TOKEN_SUCCESS,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler logout
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const logout = async (req, res, next) => {
    try {
        // Update refresh token to null
        await userService.updateRefreshToken(req.user.username, null);

        return res.status(StatusCodes.OK).send({
            message: authMessage.LOGOUT_SUCCESS,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    me,
    login,
    refreshTokens,
    logout,
};
