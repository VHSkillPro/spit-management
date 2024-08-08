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

module.exports = {
    getAllPermissions,
};
