const db = require("../../models");
const { Op } = require("sequelize");
const AppError = require("../../utils/AppError");
const { StatusCodes } = require("http-status-codes");
const userMessage = require("./userMessage");

/**
 * Đếm số lượng tài khoản
 * @param {object} query Tham số tìm kiếm
 * - username: string (Optional)
 * - roleId: int (Optional)
 * @returns {Promise<number>} Số lượng tài khoản
 */
const countAllUsers = async (query) => {
    const options = {
        where: {},
    };

    if (query?.username) {
        options.where.username = {
            [Op.like]: "%" + query.username + "%",
        };
    }

    if (query?.roleId) {
        options.where.roleId = query.roleId;
    }

    const count = await db.User.count(options);
    return count;
};

/**
 * Lấy danh sách tài khoản
 * @param {object} query Tham số tìm kiếm
 * - username: string (Optional)
 * - roleId: int (Optional)
 * - limit: int (Optional)
 * - offset: int (Optional)
 * @returns {Promise<User[]>} Danh sách tài khoản
 */
const getAllUsers = async (query) => {
    const options = {
        where: {},
    };

    if (query?.username) {
        options.where.username = {
            [Op.like]: "%" + query.username + "%",
        };
    }

    if (query?.roleId) {
        options.where.roleId = query.roleId;
    }

    if (query?.limit) {
        options.limit = query.limit;
    }

    if (query?.offset) {
        options.offset = query.offset;
    }

    const users = await db.User.findAll(options);
    return users;
};

/**
 * Lấy thông tin tài khoản theo username
 * @param {string} username
 * @returns {Promise<User>} Thông tin tài khoản
 */
const getUserByUsername = async (username) => {
    const user = await db.User.findOne({
        where: { username },
        include: "role",
    });
    return user;
};

/**
 * Tạo tài khoản mới
 * @param {object} user - Thông tin tài khoản mới
 * - username: string
 * - password: string
 * - roleId: int
 * - refreshToken: string
 * @returns {Promise<void>}
 */
const createUser = async (user) => {
    await db.sequelize.transaction(async (t) => {
        await db.User.create(user);
    });
};

/**
 * Xóa tài khoản
 * @param {string} username
 * @returns {Promise<void>}
 */
const destroyUser = async (username) => {
    await db.sequelize.transaction(async (t) => {
        await db.User.destroy({ where: { username } });
    });
};

module.exports = {
    getAllUsers,
    getUserByUsername,
    countAllUsers,
    createUser,
    destroyUser,
};
