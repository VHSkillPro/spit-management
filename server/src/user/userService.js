const knex = require("../../knex/knex");

/**
 * @typedef {Object} User
 * @property {string} username
 * @property {string} password
 * @property {string} roleId
 * @property {string} refreshToken
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * Count number of all users
 * @returns {Promise<number>} Number of all users
 */
const countAllUsers = async () => {
    const count = await knex("Users").count("*", { as: "total" });
    return count[0].total;
};

/**
 * Count number of filtered users
 * @param {object} [query]
 * @param {string} [query.username] - Username to filter (allow partial match)
 * @param {string} [query.roleId] - Role ID to filter
 * @param {number} [query.offset] - Number of items to skip
 * @param {number} [query.limit] - Number of items to retrieve
 * @returns {Promise<number>} Number of filtered users
 */
const countFilteredUsers = async (query) => {
    const count = await knex("Users")
        .count("*", { as: "total" })
        .where((builder) => {
            if (query?.username) {
                builder.where("username", "like", `%${query.username}%`);
            }

            if (query?.roleId) {
                builder.where("roleId", query.roleId);
            }
        })
        .offset(query?.offset || 0, { skipBinding: true })
        .limit(query?.limit || 1000000000, { skipBinding: true });
    return count[0].total;
};

/**
 * Get list of all users
 * @returns {Promise<User[]>} List of users
 */
const getAllUsers = async () => {
    const users = await knex("Users").select();
    return users;
};

/**
 * Get list of filtered users
 * @param {object} [query]
 * @param {string} [query.username] - Username to filter (allow partial match)
 * @param {string} [query.roleId] - Role ID to filter
 * @param {number} [query.offset] - Number of items to skip
 * @param {number} [query.limit] - Number of items to retrieve
 * @returns {Promise<User[]>} List of users
 */
const getFilteredUsers = async (query) => {
    const users = await knex("Users")
        .select()
        .where((builder) => {
            if (query?.username) {
                builder.where("username", "like", `%${query.username}%`);
            }

            if (query?.roleId) {
                builder.where("roleId", query.roleId);
            }
        })
        .offset(query?.offset || 0, { skipBinding: true })
        .limit(query?.limit || 1000000000, { skipBinding: true });
    return users;
};

/**
 * Get user by username
 * @param {string} username
 * @returns {Promise<User>} User
 */
const getUserByUsername = async (username) => {
    const user = await knex("Users").where({ username }).first();
    return user;
};

/**
 * Get user by refresh token
 * @param {string} refreshToken
 * @returns {Promise<User>} User
 */
const getUserByRefreshToken = async (refreshToken) => {
    const user = await knex("Users").where({ refreshToken }).first();
    return user;
};

/**
 * Update refresh token of user have username
 * @param {string} username
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
const updateRefreshToken = async (username, refreshToken) => {
    await knex.transaction(async (trx) => {
        await knex("Users").where({ username }).update({ refreshToken });
    });
};

// /**
//  * Tạo tài khoản mới
//  * @param {object} user - Thông tin tài khoản mới
//  * - username: string
//  * - password: string
//  * - roleId: int
//  * - refreshToken: string
//  * @returns {Promise<void>}
//  */
// const createUser = async (user) => {
//     await db.sequelize.transaction(async (t) => {
//         await db.User.create(user);
//     });
// };

// /**
//  * Xóa tài khoản
//  * @param {string} username
//  * @returns {Promise<void>}
//  */
// const destroyUser = async (username) => {
//     await db.sequelize.transaction(async (t) => {
//         await db.User.destroy({ where: { username } });
//     });
// };

// /**
//  * Lấy danh sách tài khoản theo roleId
//  * @param {string} roleId
//  * @returns {Promise<User[]>}
//  */
// const getUsersByRoleId = async (roleId) => {
//     const users = await db.User.findAll({
//         where: { roleId },
//     });
//     return users;
// };

module.exports = {
    countAllUsers,
    getAllUsers,

    countFilteredUsers,
    getFilteredUsers,

    getUserByUsername,
    getUserByRefreshToken,

    updateRefreshToken,
    // getUsersByRoleId,
    // countAllUsers,
    // createUser,
    // destroyUser,
};
