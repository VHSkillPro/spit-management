const express = require("express");
const userService = require("./userService");
const roleService = require("../role/roleService");
const userMessage = require("./userMessage");
const AppError = require("../../utils/AppError");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");

/**
 * Hander get list of all users
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const index = async (req, res, next) => {
    try {
        const users = await userService.getFilteredUsers(req.query);

        return res.status(StatusCodes.OK).send({
            data: {
                users: users,
                total: await userService.countFilteredUsers(req.query),
            },
            message: userMessage.INDEX,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler get user by username
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const show = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await userService.getUserByUsername(username);

        if (!user) {
            return next(
                new AppError(StatusCodes.NOT_FOUND, userMessage.USER_NOT_FOUND)
            );
        }

        return res.status(StatusCodes.OK).send({
            data: {
                user: user,
            },
            message: userMessage.SHOW,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler create new user
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const create = async (req, res, next) => {
    try {
        const { username, password, roleId } = req.body;
        const user = await userService.getUserByUsername(username);

        // Check if user existed
        if (user) {
            return next(
                new AppError(StatusCodes.CONFLICT, userMessage.USER_EXISTED)
            );
        }

        // Create new user
        await userService.createUser({
            username: username,
            password: password,
            roleId: roleId,
        });

        return res.status(StatusCodes.CREATED).send({
            message: userMessage.CREATE,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler update password and roleId of user
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const update = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await userService.getUserByUsername(username);

        // User không tồn tại
        if (!user) {
            return next(
                new AppError(StatusCodes.NOT_FOUND, userMessage.USER_NOT_FOUND)
            );
        }

        // Update user
        const { password, roleId } = req.body;

        await userService.updateUser(username, {
            password,
            roleId,
        });

        return res.status(StatusCodes.OK).send({
            message: userMessage.UPDATE,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler delete user
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const destroy = async (req, res, next) => {
    try {
        const username = req.params.username;

        // Can't delete yourself
        if (username == req.user.username) {
            return next(
                new AppError(
                    StatusCodes.BAD_REQUEST,
                    userMessage.CANNOT_DELETE_YOURSELF
                )
            );
        }

        // Check if user is not existed
        const user = await userService.getUserByUsername(username);

        if (!user) {
            return next(
                new AppError(StatusCodes.NOT_FOUND, userMessage.USER_NOT_FOUND)
            );
        }

        // Check if user have role is root
        const role = await roleService.getRoleById(user.roleId);

        if (role.isRoot) {
            return next(
                new AppError(
                    StatusCodes.FORBIDDEN,
                    userMessage.CANNOT_DELETE_ROOT_USER
                )
            );
        }

        // Delete user
        await userService.destroyUser(username);

        return res.status(StatusCodes.OK).send({
            message: userMessage.DESTROY,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
