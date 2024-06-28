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
        return queryInterface.removeColumn("Users", "memberId");
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        return queryInterface.addColumn("Users", "memberId", {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            references: {
                model: "Members",
                key: "memberId",
            },
        });
    },
};
