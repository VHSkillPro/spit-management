const knex = require("../../knex/knex");

/**
 * Check if role have permission
 * @param {string} roleId
 * @param {string} permissionId
 * @returns {Promise<boolean>}
 */
const havePermission = async (roleId, permissionId) => {
    const count = await knex("Roles")
        .count("*", { as: "total" })
        .leftJoin("Roles_Permissions", "Roles.id", "Roles_Permissions.roleId")
        .where("Roles.isRoot", true)
        .orWhere((builder) => {
            builder
                .where("Roles_Permissions.roleId", roleId)
                .where("Roles_Permissions.permissionId", permissionId);
        });
    return count[0].total > 0;
};

module.exports = {
    havePermission,
};
