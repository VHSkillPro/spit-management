const express = require("express");
const { StatusCodes } = require("http-status-codes");
const permissionMessage = require("./permissionMessage");
const permissionService = require("./permissionService");

/**
 * Handler get list of permissions
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const index = async (req, res, next) => {
    try {
        const permissions = await permissionService.getAllPermissions();

        return res.status(StatusCodes.OK).json({
            data: {
                permissions,
                total: permissions.length,
            },
            message: permissionMessage.INDEX,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler get permission by id
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const show = async (req, res, next) => {
    try {
        const permissionId = req.params.permissionId;
        const permission = await permissionService.getPermissionById(
            permissionId
        );

        return res.status(StatusCodes.OK).json({
            data: {
                permission,
            },
            message: permissionMessage.SHOW,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    index,
    show,
};
