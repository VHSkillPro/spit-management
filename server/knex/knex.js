const environment = process.env.ENV || "development";
const config = require("../knexfile")[environment];

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
