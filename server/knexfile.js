// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: "mysql2",
        connection: {
            host: "172.28.5.0",
            port: 3306,
            user: "root",
            password: "a112233",
            database: "spit_management",
        },
        migrations: {
            tableName: "knex_migrations",
            directory: "./knex/migrations",
        },
        seeds: {
            directory: "./knex/seeds",
        },
    },

    staging: {
        client: "mysql2",
        connection: {
            host: "172.28.5.0",
            port: 3306,
            user: "root",
            password: "a112233",
            database: "spit_management",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
            directory: "./knex/migrations",
        },
        seeds: {
            directory: "./knex/seeds",
        },
    },

    production: {
        client: "mysql2",
        connection: {
            host: "172.28.5.0",
            port: 3306,
            user: "root",
            password: "a112233",
            database: "spit_management",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
            directory: "./knex/migrations",
        },
        seeds: {
            directory: "./knex/seeds",
        },
    },
};
