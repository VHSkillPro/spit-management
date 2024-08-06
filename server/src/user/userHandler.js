const express = require("express");
const userService = require("./userService");
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

// /**
//  * API thêm một user mới vào hệ thông
//  * @path /api/v1/users
//  * @method POST
//  * @body
//  * - username: string
//  * - password: string
//  * - roleId: string
//  * @param {express.Request} req
//  * @param {express.Response} res
//  * @param {express.NextFunction} next
//  */
// const create = async (req, res, next) => {
//     try {
//         // Kiểm tra username đã tồn tại
//         const { username, password, roleId } = req.body;
//         const user = await userService.getUserByUsername(username);

//         if (user) {
//             return next(
//                 new AppError(
//                     StatusCodes.CONFLICT,
//                     userMessage.USER_ALREADY_EXISTS
//                 )
//             );
//         }

//         // Mã hoá mật khẩu
//         const saltRounds = 10;
//         const hashPassword = bcrypt.hashSync(password, saltRounds);

//         // Thêm user mới vào database
//         await userService.createUser({
//             username: username,
//             password: hashPassword,
//             roleId: roleId,
//             refreshToken: null,
//         });

//         // Đăng ký thành công, trả về thông báo
//         return res.status(StatusCodes.CREATED).send({
//             message: userMessage.CREATE_USER_SUCCESS,
//         });
//     } catch (error) {
//         console.log(error);
//         return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
//     }
// };

// /**
//  * API cập nhật thông tin user
//  * @path /api/v1/users/:username
//  * @method PATCH
//  * @body
//  * - password: string (Optional)
//  * - roleId: string (Optional)
//  * @param {express.Request} req
//  * @param {express.Response} res
//  * @param {express.NextFunction} next
//  */
// const update = async (req, res, next) => {
//     try {
//         const username = req.params.username;
//         const user = await userService.getUserByUsername(username);

//         // User không tồn tại
//         if (!user) {
//             return next(
//                 new AppError(StatusCodes.NOT_FOUND, userMessage.USER_NOT_FOUND)
//             );
//         }

//         // Nếu có mật khẩu mới
//         if (req.body.password) {
//             const saltRounds = 10;
//             const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
//             user.password = hashPassword;
//         }

//         // Nếu có roleId mới
//         if (req.body.roleId) {
//             user.roleId = req.body.roleId;
//         }

//         // Cập nhật vào database
//         await db.sequelize.transaction(async (t) => {
//             await user.save();
//         });

//         // Trả về thông báo xoá thành công
//         return res.status(StatusCodes.OK).send({
//             message: userMessage.UPDATE_USER_SUCCESS,
//         });
//     } catch (error) {
//         console.log(error);
//         return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
//     }
// };

// /**
//  * API xóa một user khỏi hệ thống
//  * @path /api/v1/users/:username
//  * @method DELETE
//  * @param {express.Request} req
//  * @param {express.Response} res
//  * @param {express.NextFunction} next
//  */
// const destroy = async (req, res, next) => {
//     try {
//         const username = req.params.username;

//         // Không thể xóa chính mình
//         if (username == req.user.username) {
//             return next(
//                 new AppError(
//                     StatusCodes.BAD_REQUEST,
//                     userMessage.CANNOT_DELETE_YOURSELF
//                 )
//             );
//         }

//         // Tìm user theo username
//         const user = await userService.getUserByUsername(username);

//         // Không tìm thấy user
//         if (!user) {
//             return next(
//                 new AppError(StatusCodes.NOT_FOUND, userMessage.USER_NOT_FOUND)
//             );
//         }

//         // Không thể xóa root user
//         if (user.role.isRoot) {
//             return next(
//                 new AppError(
//                     StatusCodes.FORBIDDEN,
//                     userMessage.CANNOT_DELETE_ROOT_USER
//                 )
//             );
//         }

//         // Xóa user
//         await db.sequelize.transaction(async (t) => {
//             await user.destroy();
//         });

//         return res.status(StatusCodes.OK).send({
//             message: userMessage.DELETE_USER_SUCCESS,
//         });
//     } catch (error) {
//         console.log(error);
//         return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR));
//     }
// };

module.exports = {
    index,
    show,
    // create,
    // update,
    // destroy,
};
