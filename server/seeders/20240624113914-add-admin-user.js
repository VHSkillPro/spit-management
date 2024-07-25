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

        await queryInterface.sequelize.transaction(async (t) => {
            const saltRounds = 10;
            const password = "admin";

            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            await queryInterface.bulkInsert(
                "Roles",
                [
                    {
                        id: "admin",
                        name: "Quản trị viên",
                        isRoot: true,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: "manager",
                        name: "Quản lý",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: "member",
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
                        roleId: "admin",
                        refreshToken: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ],
                {}
            );
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
            await queryInterface.bulkDelete("Users", null, {});
            await queryInterface.bulkDelete("Roles", null, {});
        });
    },
};
