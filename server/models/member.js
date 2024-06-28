"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Member extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    Member.init(
        {
            memberId: {
                type: DataTypes.STRING(10),
                unique: true,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            gender: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            birthday: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            class: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.STRING(1000),
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            generation: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            state: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Member",
        }
    );
    return Member;
};
