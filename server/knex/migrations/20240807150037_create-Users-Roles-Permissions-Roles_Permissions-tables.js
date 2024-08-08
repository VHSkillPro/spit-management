/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    try {
        await knex.transaction(async (trx) => {
            await knex.schema.createTable("Roles", (table) => {
                table.string("id").primary();
                table.string("name").notNullable();
                table.boolean("isRoot").notNullable().defaultTo(false);
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

            await knex.schema.createTable("Permissions", (table) => {
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

            await knex.schema.createTable("Roles_Permissions", (table) => {
                table.string("roleId");
                table.string("permissionId");
                table.primary(["roleId", "permissionId"]);
                table.timestamp("createdAt").defaultTo(knex.fn.now());
                table
                    .dateTime("updatedAt")
                    .notNullable()
                    .defaultTo(
                        knex.raw(
                            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                        )
                    );
                table.foreign("roleId").references("Roles.id");
            });

            await knex.schema.createTable("Users", (table) => {
                table.string("username").primary();
                table.string("password").notNullable();
                table.string("roleId").notNullable();
                table.string("refreshToken");
                table.timestamp("createdAt").defaultTo(knex.fn.now());
                table
                    .dateTime("updatedAt")
                    .notNullable()
                    .defaultTo(
                        knex.raw(
                            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                        )
                    );
                table.foreign("roleId").references("Roles.id");
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
    try {
        await knex.transaction(async (trx) => {
            await knex.schema.dropTable("Users");
            await knex.schema.dropTable("Roles_Permissions");
            await knex.schema.dropTable("Permissions");
            await knex.schema.dropTable("Roles");
        });
    } catch (error) {
        console.error(error);
    }
};
