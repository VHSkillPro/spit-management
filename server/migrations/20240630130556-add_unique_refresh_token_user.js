"use strict";

/**
 * @type {import('sequelize-cli').Migration}
 * */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

        return queryInterface.addConstraint("Users", {
            fields: ["refreshToken"],
            type: "unique",
            name: "UK_USER_REFRESH_TOKEN",
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */

        return queryInterface.removeConstraint(
            "Users",
            "UK_USER_REFRESH_TOKEN"
        );
    },
};
