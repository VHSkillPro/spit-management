const knex = require("../../knex/knex");
const bcrypt = require("bcrypt");

/**
 * @typedef {Object} User
 * @property {string} username
 * @property {string} password
 * @property {string} roleId
 * @property {string} semesterId
 * @property {string} refreshToken
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * Count number of all users
 * @returns {Promise<number>} Number of all users
 */
const countAllUsers = async () => {
    const count = await knex("Users").count("*", { as: "total" });
    return count[0].total;
};

/**
 * Count number of filtered users
 * @param {object} [query]
 * @param {string} [query.username] - Username to filter (allow partial match)
 * @param {string} [query.roleId] - Role ID to filter
 * @param {number} [query.offset] - Number of items to skip
 * @param {number} [query.limit] - Number of items to retrieve
 * @returns {Promise<number>} Number of filtered users
 */
const countFilteredUsers = async (query) => {
    const count = await knex("Users")
        .count("*", { as: "total" })
        .where((builder) => {
            if (query?.username) {
                builder.where("username", "like", `%${query.username}%`);
            }

            if (query?.roleId) {
                builder.where("roleId", query.roleId);
            }
        })
        .offset(query?.offset || 0, { skipBinding: true })
        .limit(query?.limit || 1000000000, { skipBinding: true });
    return count[0].total;
};

/**
 * Get list of all users
 * @returns {Promise<User[]>} List of users
 */
const getAllUsers = async () => {
    const users = await knex("Users").select();
    return users;
};

/**
 * Get list of filtered users
 * @param {object} [query]
 * @param {string} [query.username] - Username to filter (allow partial match)
 * @param {string} [query.roleId] - Role ID to filter
 * @param {number} [query.offset] - Number of items to skip
 * @param {number} [query.limit] - Number of items to retrieve
 * @returns {Promise<User[]>} List of users
 */
const getFilteredUsers = async (query) => {
    const users = await knex("Users")
        .select()
        .where((builder) => {
            if (query?.username) {
                builder.where("username", "like", `%${query.username}%`);
            }

            if (query?.roleId) {
                builder.where("roleId", query.roleId);
            }
        })
        .offset(query?.offset || 0, { skipBinding: true })
        .limit(query?.limit || 1000000000, { skipBinding: true });
    return users;
};

/**
 * Get user by username
 * @param {string} username
 * @returns {Promise<User>} User
 */
const getUserByUsername = async (username) => {
    const user = await knex("Users").where({ username }).first();
    return user;
};

/**
 * Get user by refresh token
 * @param {string} refreshToken
 * @returns {Promise<User>} User
 */
const getUserByRefreshToken = async (refreshToken) => {
    const user = await knex("Users").where({ refreshToken }).first();
    return user;
};

/**
 * Update refresh token of user have username
 * @param {string} username
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
const updateRefreshToken = async (username, refreshToken) => {
    await knex.transaction(async (trx) => {
        await knex("Users").where({ username }).update({ refreshToken });
    });
};

/**
 * Create a new user
 * @param {object} user
 * @param {string} user.username
 * @param {string} user.password
 * @param {string} user.roleId
 * @returns {Promise<void>}
 */
const createUser = async (user) => {
    await knex.transaction(async (trx) => {
        const saltRounds = 10;
        user.password = bcrypt.hashSync(user.password, saltRounds);

        await knex("Users").insert(user);
    });
};

/**
 * Update a user by username
 * @param {string} username
 * @param {object} data
 * @param {string} [data.password]
 * @param {string} [data.roleId]
 */
const updateUser = async (username, data) => {
    await knex.transaction(async (trx) => {
        if (data?.password) {
            const saltRounds = 10;
            data.password = bcrypt.hashSync(data.password, saltRounds);
        } else {
            delete data.password;
        }

        if (data?.roleId === undefined) {
            delete data.roleId;
        }

        if (Object.keys(data).length > 0) {
            await knex("Users").where({ username }).update(data);
        }
    });
};

/**
 * Delete a user by username
 * @param {string} username
 * @returns {Promise<void>}
 */
const destroyUser = async (username) => {
    await knex.transaction(async (trx) => {
        await knex("Users").where({ username }).del();
    });
};

module.exports = {
    countAllUsers,
    getAllUsers,

    countFilteredUsers,
    getFilteredUsers,

    getUserByUsername,
    getUserByRefreshToken,

    createUser,

    updateUser,
    updateRefreshToken,

    destroyUser,
};
