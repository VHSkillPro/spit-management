const environment = process.env.ENV || "development";
const config = require("../knexfile")[environment];

config.connection.typeCast = (field, next) => {
    if (field.type === "TINY" && field.length === 1) {
        let value = field.string();
        return value ? value === "1" : null;
    }
    return next();
};

const knex = require("knex")(config);

const testConnection = async () => {
    try {
        await knex.raw("SELECT 1 + 1 as result");
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection failed");
        console.log(error);
    }
};
testConnection();

module.exports = knex;
