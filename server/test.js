const { where } = require("sequelize");
const db = require("./models");

const test = async (req, res) => {
    const role = await db.Role.findAll({
        where: {
            id: 3,
            "$permissions.route$": "user.index",
        },
        include: "permissions",
    });

    return res.send(role);
};

module.exports = {
    test,
};
