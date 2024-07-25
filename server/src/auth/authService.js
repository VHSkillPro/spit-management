const db = require("../../models");

/**
 * Cập nhập refreshToken vào database
 * @param {string} username
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
const updateRefreshToken = async (username, refreshToken) => {
    await db.sequelize.transaction(async (t) => {
        await db.User.update(
            { refreshToken: refreshToken },
            {
                where: {
                    username: username,
                },
            }
        );
    });
};

/**
 * Lấy thông tin tài khoản theo username
 * @param {string} username
 * @returns {Promise<User>} Thông tin tài khoản
 */
const getUserByUsername = async (username) => {
    const user = await db.User.findOne({ where: { username } });
    return user;
};

const havePermission = async (roleId, permissionId) => {
    const count = await db.Role.count({
        where: {
            id: roleId,
            "$permissions.id$": permissionId,
        },
        include: "permissions",
    });
    return count > 0;
};

module.exports = {
    updateRefreshToken,
    getUserByUsername,
};
