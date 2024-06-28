"use strict";

const db = require("../models");

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

        await queryInterface.bulkInsert(
            "Members",
            [
                {
                    memberId: "0000000000",
                    lastName: "admin",
                    firstName: "admin",
                    gender: true,
                    birthday: new Date(),
                    email: "clbhtlt.ithusc@gmail.com",
                    phoneNumber: "0702291317",
                    class: "admin",
                    avatar: null,
                    role: "admin",
                    generation: 1,
                    state: 1,
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
        await queryInterface.bulkDelete("Members", null, {});
    },
};
