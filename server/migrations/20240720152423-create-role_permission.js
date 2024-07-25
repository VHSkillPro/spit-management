"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable("Roles_Permissions", {
            roleId: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            permissionId: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.DataTypes.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.DataTypes.NOW,
            },
        });

        await queryInterface.addConstraint("Roles_Permissions", {
            fields: ["roleId"],
            type: "foreign key",
            name: "FK_ROLEID_ROLES_PERMISSONS",
            references: {
                table: "Roles",
                field: "id",
            },
        });

        await queryInterface.addConstraint("Roles_Permissions", {
            fields: ["permissionId"],
            type: "foreign key",
            name: "FK_PERMISSIONID_ROLES_PERMISSONS",
            references: {
                table: "Permissions",
                field: "id",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeConstraint(
            "Roles_Permissions",
            "FK_ROLEID_ROLES_PERMISSONS"
        );

        await queryInterface.removeConstraint(
            "Roles_Permissions",
            "FK_PERMISSIONID_ROLES_PERMISSONS"
        );

        await queryInterface.dropTable("Roles_Permissions");
    },
};
