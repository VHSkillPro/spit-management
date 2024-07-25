const express = require("express");
const userService = require("./userService");
const userMessage = require("./userMessage");
const AppError = require("../../utils/AppError");
const { StatusCodes } = require("http-status-codes");

/**
 * API lấy danh sách tài khoản
 * @path /api/v1/users
 * @query
 * - username: string (Optional)
 * - roleId: int (Optional)
 * - offset: int (Optional)
 * - limit: int (Optional)
 * @method GET
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const index = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers(req.query);

        return res.status(StatusCodes.OK).send({
            data: {
                users: users,
                total: await userService.countAllUsers(req.query),
            },
            message: userMessage.GET_ALL_USERS_SUCCESS,
        });
    } catch (error) {
        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

/**
 * API lấy thông tin user theo username
 * @path /api/v1/users/:username
 * @method GET
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const show = async (req, res, next) => {
    try {
        const user = await userService.getUserByUsername(req.params.username);

        if (!user) {
            return next(
                new AppError(StatusCodes.NOT_FOUND, userMessage.USER_NOT_FOUND)
            );
        }

        return res.status(StatusCodes.OK).send({
            data: {
                user: user,
            },
            message: userMessage.GET_ALL_USERS_SUCCESS,
        });
    } catch (error) {
        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

const destroy = async (req, res, next) => {
    try {
        if (req.params.username === "admin") {
            return next(
                new AppError(
                    StatusCodes.BAD_REQUEST,
                    userMessage.DELETE_USER_FAIL
                )
            );
        }

        await userService.destroyUser(req.params.username);

        return res.status(StatusCodes.OK).send({
            message: userMessage.DELETE_USER_SUCCESS,
        });
    } catch (error) {
        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

module.exports = {
    index,
    show,
    destroy,
};
