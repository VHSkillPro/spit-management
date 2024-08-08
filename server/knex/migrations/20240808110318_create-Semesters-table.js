/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    try {
        await knex.transaction(async (trx) => {
            await knex.schema.createTable("Semesters", (table) => {
                table.string("id").primary();
                table.string("name").notNullable();
                table.timestamp("createdAt").defaultTo(knex.fn.now());
                table
                    .dateTime("updatedAt")
                    .notNullable()
                    .defaultTo(
                        knex.raw(
                            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                        )
                    );
            });

            await knex.schema.table("Users", (table) => {
                table.string("semesterId");
                table.foreign("semesterId").references("Semesters.id");
            });
        });
    } catch (error) {
        console.error(error);
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.transaction(async (trx) => {
        await knex.schema.table("Users", (table) => {
            table.dropForeign("semesterId");
            table.dropColumn("semesterId");
        });

        await knex.schema.dropTable("Semesters");
    });
};
