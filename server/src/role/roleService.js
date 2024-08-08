const knex = require("../../knex/knex");

/**
 * @typedef {object} Role
 * @property {string} id
 * @property {string} name
 * @property {boolean} isRoot
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * Get all roles
 * @returns {Promise<Role[]>}
 */
const getAllRoles = async () => {
    const roles = await knex("Roles").select();
    return roles;
};

/**
 * Get role by id
 * @param {string} roleId
 * @returns {Promise<Role>} Role
 */
const getRoleById = async (roleId) => {
    const role = await knex("Roles").where("id", roleId).first();
    return role;
};

/**
 * Create new role
 * @param {string} roleId
 * @param {string} roleName
 * @returns {Promise<void>}
 */
const createRole = async (roleId, roleName) => {
    await knex.transaction(async (trx) => {
        await knex("Roles").insert({
            id: roleId,
            name: roleName,
            isRoot: false,
        });
    });
};

/**
 * Update role
 * @param {string} roleId
 * @param {object} role
 * @param {string} [role.name]
 * @param {string[]} [role.permissions]
 * @returns {Promise<void>}
 */
const updateRole = async (roleId, role) => {
    await knex.transaction(async (trx) => {
        // Update roleName
        if (role?.name) {
            await knex("Roles").where("id", roleId).update({
                name: role.name,
            });
        }

        if (role?.permissions) {
            // Delete all permissions of role
            await knex("Roles_Permissions").where("roleId", roleId).del();
        }

        if (role?.permissions && role.permissions.length > 0) {
            // Insert new permissions
            await knex("Roles_Permissions").insert(
                role.permissions.map((permissionId) => ({
                    roleId: roleId,
                    permissionId: permissionId,
                }))
            );
        }
    });
};

const destroyRole = async (roleId) => {
    await knex.transaction(async (trx) => {
        await knex("Roles_Permissions").where("roleId", roleId).del();
        await knex("Roles").where("id", roleId).del();
    });
};

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    destroyRole,
};
