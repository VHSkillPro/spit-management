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

        await queryInterface.addConstraint("Users", {
            fields: ["roleId"],
            type: "foreign key",
            name: "FK_ROLEID_USERS",
            references: {
                table: "Roles",
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

        await queryInterface.removeConstraint("Users", "FK_ROLEID_USERS");
    },
};
