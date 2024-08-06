const knex = require("../../knex/knex");

/**
 * @typedef {Object} User
 * @property {string} username
 * @property {string} password
 * @property {string} roleId
 * @property {string} refreshToken
 */

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

// /**
//  * Kiểm tra quyền permissionId của roleId
//  * @param {string} roleId
//  * @param {string} permissionId
//  * @returns
//  */
// const havePermission = async (roleId, permissionId) => {
//     const count = await db.Role.count({
//         where: {
//             id: roleId,
//             [Op.or]: [
//                 {
//                     "$permissions.id$": permissionId,
//                 },
//                 {
//                     isRoot: true,
//                 },
//             ],
//         },
//         include: "permissions",
//     });
//     return count > 0;
// };

module.exports = {
    updateRefreshToken,
    getUserByUsername,
    getUserByRefreshToken,
    // havePermission,
};
