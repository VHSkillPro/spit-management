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
                route: "role.index",
                name: "Xem danh sách chức vụ trong hệ thống",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                route: "role.show",
                name: "Xem chi tiết chức vụ trong hệ thống",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                route: "role.create",
                name: "Thêm chức vụ mới trong hệ thống",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                route: "role.update",
                name: "Cập nhật thông tin chức vụ trong hệ thống",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                route: "role.destroy",
                name: "Xoá chức vụ trong hệ thống",
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
                "role.index",
                "role.show",
                "role.create",
                "role.update",
                "role.destroy",
            ],
        });
    },
};
