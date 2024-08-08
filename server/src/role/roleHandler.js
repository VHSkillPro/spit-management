const express = require("express");
const { StatusCodes } = require("http-status-codes");
const roleService = require("./roleService");
const roleMessage = require("./roleMessage");
const userServices = require("../user/userService");
const AppError = require("../../utils/AppError");

/**
 * Handler get list of roles
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const index = async (req, res, next) => {
    try {
        const roles = await roleService.getAllRoles();

        return res.status(StatusCodes.OK).send({
            data: {
                roles: roles,
                total: roles.length,
            },
            message: roleMessage.INDEX,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler get role by id
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const show = async (req, res, next) => {
    try {
        const roleId = req.params.roleId;
        const role = await roleService.getRoleById(roleId);

        if (!role) {
            return next(
                new AppError(StatusCodes.NOT_FOUND, roleMessage.ROLE_NOT_FOUND)
            );
        }

        return res.status(StatusCodes.OK).send({
            data: {
                role: role,
            },
            message: roleMessage.SHOW,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler create new role
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const create = async (req, res, next) => {
    try {
        const roleId = req.body.id;
        const roleName = req.body.name;
        const role = await roleService.getRoleById(roleId);

        // Check role is existed
        if (role) {
            return next(
                new AppError(StatusCodes.CONFLICT, roleMessage.ROLE_EXISTED)
            );
        }

        // Create new role
        await roleService.createRole(roleId, roleName);

        return res.status(StatusCodes.CREATED).send({
            message: roleMessage.CREATE,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler update role
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const update = async (req, res, next) => {
    try {
        const roleId = req.params.roleId;
        const roleName = req.body.name;
        const permissions = req.body.permissions;

        // Check role is not existed
        const role = await roleService.getRoleById(roleId);

        if (!role) {
            return res.status(StatusCodes.NOT_FOUND).send({
                message: roleMessage.ROLE_NOT_FOUND,
            });
        }

        // Update role
        await roleService.updateRole(roleId, {
            name: roleName,
            permissions: permissions,
        });

        return res.status(StatusCodes.OK).send({
            message: roleMessage.UPDATE,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler delete role
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const destroy = async (req, res, next) => {
    try {
        const roleId = req.params.roleId;
        const role = await roleService.getRoleById(roleId);

        // Check role is not existed
        if (!role) {
            return next(
                new AppError(StatusCodes.NOT_FOUND, roleMessage.ROLE_NOT_FOUND)
            );
        }

        // Check role is root
        if (role.isRoot) {
            return next(
                new AppError(
                    StatusCodes.BAD_REQUEST,
                    roleMessage.CANNOT_DELETE_ROOT
                )
            );
        }

        // Check role is used
        const users = await userServices.getFilteredUsers({ roleId: roleId });

        if (users && users.length > 0) {
            return next(
                new AppError(StatusCodes.BAD_REQUEST, roleMessage.ROLE_IS_USED)
            );
        }

        // Delete role
        await roleService.destroyRole(roleId);

        return res.status(StatusCodes.OK).send({
            message: roleMessage.DESTROY,
        });
    } catch (error) {
        return next(error);
    }
};

// /**
//  * API lấy danh sách quyền của role
//  * @param {express.Request} req
//  * @param {string} req.params.roleId - Role cần lấy danh sách quyền
//  * @param {express.Response} res
//  * @param {express.NextFunction} next
//  */
// const permissions = async (req, res, next) => {
//     try {
//         const roleId = req.params.roleId;
//         const permissions = await roleService.getPermissionsOfRole(roleId);

//         // Kiểm tra xem role có tồn tại không
//         if (!permissions) {
//             return next(
//                 new AppError(StatusCodes.NOT_FOUND, roleMessage.NOT_FOUND)
//             );
//         }

//         // Trả về kết quả
//         return res.status(StatusCodes.OK).send({
//             data: {
//                 permissions: permissions,
//             },
//             message: roleMessage.GET_PERMISSIONS,
//         });
//     } catch (error) {
//         console.log(error);
//         return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
//     }
// };

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    // permissions,
};
