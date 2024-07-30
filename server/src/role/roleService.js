const db = require("../../models");

/**
 * Lấy danh sách role
 * @returns {Promise<Role[]>}
 */
const getAllRoles = async () => {
    const roles = await db.Role.findAll({
        attributes: { exclude: ["isRoot"] },
    });
    return roles;
};

/**
 * Đếm số lượng role
 * @returns {Promise<number>}
 */
const countAllRoles = async () => {
    const count = await db.Role.count();
    return count;
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

/**
 * Tạo role mới
 * @param {string} roleId
 * @param {string} roleName
 */
const createRole = async (roleId, roleName) => {
    await db.sequelize.transaction(async (t) => {
        await db.Role.create({
            id: roleId,
            name: roleName,
        });
    });
};

/**
 * Lấy danh sách permission của role
 * @param {string} roleId
 * @returns {Promise<Permission[]> | undefined}
 */
const getPermissionsOfRole = async (roleId) => {
    const role = await db.Role.findOne({
        where: { id: roleId },
        include: "permissions",
    });

    // Nếu role là root thì trả về tất cả permission
    if (role.isRoot) {
        return await db.Permission.findAll();
    }

    return role?.permissions;
};

module.exports = {
    getAllRoles,
    countAllRoles,
    getRoleById,
    createRole,
    getPermissionsOfRole,
};
