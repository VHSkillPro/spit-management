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

        await queryInterface.bulkInsert("Permissions", [
            {
                route: "user.index",
                name: "Xem danh sách tài khoản",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                route: "user.show",
                name: "Xem chi tiết tài khoản",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                route: "user.create",
                name: "Thêm tài khoản mới",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                route: "user.update",
                name: "Cập nhật thông tin tài khoản",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                route: "user.destroy",
                name: "Xoá tài khoản",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Permissions", {
            route: [
                "user.index",
                "user.show",
                "user.create",
                "user.update",
                "user.destroy",
            ],
        });
    },
};
