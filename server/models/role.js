"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Role.belongsToMany(models.Permission, {
                through: "Roles_Permissions",
                as: "permissions",
            });
        }
    }

    Role.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            isRoot: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "Role",
            hooks: {
                beforeDestroy: async (role, options) => {
                    await sequelize.models.Roles_Permissions.destroy({
                        where: {
                            roleId: role.id,
                        },
                    });
                },
            },
        }
    );

    return Role;
};
