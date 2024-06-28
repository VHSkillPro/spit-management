"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Members", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            memberId: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(10),
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            gender: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            birthday: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            phoneNumber: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            class: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            avatar: {
                type: Sequelize.STRING(1000),
            },
            role: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            generation: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            state: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Members");
    },
};
