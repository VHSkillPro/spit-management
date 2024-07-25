"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.sequelize.transaction(async (t) => {
            await queryInterface.bulkInsert("Permissions", [
                {
                    id: "permission.index",
                    name: "Xem danh sách quyền",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.sequelize.transaction(async (t) => {
            await queryInterface.bulkDelete("Permissions", {
                id: ["permission.index"],
            });
        });
    },
};
