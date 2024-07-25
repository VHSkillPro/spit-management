"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Role, {
                foreignKey: "roleId",
                as: "role",
            });
        }
    }

    User.init(
        {
            username: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.STRING,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            roleId: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            refreshToken: {
                unique: true,
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
