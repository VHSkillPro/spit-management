const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    try {
        await knex.transaction(async (trx) => {
            await knex("Roles").insert([
                { id: "admin", name: "Quản trị viên", isRoot: true },
            ]);

            const saltRounds = 10;
            const password = "admin";

            const salt = bcrypt.genSaltSync(saltRounds);
            const hashPassword = bcrypt.hashSync(password, salt);

            await knex("Users").insert([
                {
                    username: "admin",
                    password: hashPassword,
                    roleId: "admin",
                },
            ]);
        });
    } catch (error) {
        console.error(error);
    }
};
