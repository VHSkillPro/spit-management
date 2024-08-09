/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    try {
        await knex.transaction(async (trx) => {
            await trx.schema.createTable("Boards", (table) => {
                table.string("id").primary();
                table.string("name").notNullable();
                table.string("description").notNullable();
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
        await knex.schema.dropTable("Boards");
    });
};
