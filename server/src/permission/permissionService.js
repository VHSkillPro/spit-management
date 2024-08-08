const knex = require("../../knex/knex");

/**
 * @typedef {Object} Permission
 * @property {string} id
 * @property {string} name
 */

/**
 * Get list of all permissions
 * @returns {Promise<Permission[]>} List of permissions
 */
const getAllPermissions = async () => {
    const permissions = await knex("Permissions").select();
    return permissions;
};

/**
 * Get list of permissions of a role
 * @param {string} roleId
 * @returns {Promise<Permission[]>} List of permissions
 */
const getPermissionsOfRole = async (roleId) => {
    const permissions = await knex("Permissions")
        .join(
            "Roles_Permissions",
            "Permissions.id",
            "Roles_Permissions.permissionId"
        )
        .where("Roles_Permissions.roleId", roleId)
        .select("Permissions.*");
    return permissions;
};

module.exports = {
    getAllPermissions,
    getPermissionsOfRole,
};
