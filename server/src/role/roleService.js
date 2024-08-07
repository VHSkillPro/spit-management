const knex = require("../../knex/knex");

/**
 * @typedef {object} Role
 * @property {string} id
 * @property {string} name
 * @property {boolean} isRoot
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

// /**
//  * Lấy danh sách role
//  * @returns {Promise<Role[]>}
//  */
// const getAllRoles = async () => {
//     const roles = await db.Role.findAll({
//         attributes: { exclude: ["isRoot"] },
//     });
//     return roles;
// };

// /**
//  * Đếm số lượng role
//  * @returns {Promise<number>}
//  */
// const countAllRoles = async () => {
//     const count = await db.Role.count();
//     return count;
// };

/**
 * Get role by id
 * @param {string} roleId
 * @returns {Promise<Role>} Role
 */
const getRoleById = async (roleId) => {
    const role = await knex("Roles").where("id", roleId).first();
    return role;
};

// /**
//  * Tạo role mới
//  * @param {string} roleId
//  * @param {string} roleName
//  */
// const createRole = async (roleId, roleName) => {
//     await db.sequelize.transaction(async (t) => {
//         await db.Role.create({
//             id: roleId,
//             name: roleName,
//         });
//     });
// };

// /**
//  * Lấy danh sách permission của role
//  * @param {string} roleId
//  * @returns {Promise<Permission[]> | undefined}
//  */
// const getPermissionsOfRole = async (roleId) => {
//     const role = await db.Role.findOne({
//         where: { id: roleId },
//         include: "permissions",
//     });

//     // Nếu role là root thì trả về tất cả permission
//     if (role.isRoot) {
//         return await db.Permission.findAll();
//     }

//     return role?.permissions;
// };

module.exports = {
    // getAllRoles,
    // countAllRoles,
    getRoleById,
    // createRole,
    // getPermissionsOfRole,
};
