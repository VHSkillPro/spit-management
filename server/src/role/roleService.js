const db = require("../../models");

/**
 * Lấy danh sách role
 * @returns {Promise<Role[]>}
 */
const getAllRoles = async () => {
    const roles = await db.Role.findAll();
    return roles;
};

/**
 * Lấy role theo roleId
 * @param {string} roleId
 * @returns {Promise<Role>}
 */
const getRoleById = async (roleId) => {
    const role = await db.Role.findOne({
        where: { id: roleId },
    });
    return role;
};

module.exports = { getAllRoles, getRoleById };
