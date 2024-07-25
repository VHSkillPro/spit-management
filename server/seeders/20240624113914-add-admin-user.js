"use strict";

const bcrypt = require("bcrypt");

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

        const saltRounds = 10;
        const password = "admin";

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        await queryInterface.bulkInsert(
            "Roles",
            [
                {
                    name: "Quản trị viên",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Quản lý",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Thành viên",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );

        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    username: "admin",
                    password: hash,
                    roleId: 1,
                    refreshToken: null,
                    isAdmin: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Users", null, {});
        await queryInterface.bulkDelete("Roles", null, {});
    },
};
