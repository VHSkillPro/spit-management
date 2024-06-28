"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            role: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            refreshToken: {
                type: DataTypes.STRING,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
