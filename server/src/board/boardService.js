const knex = require("../../knex/knex");

/**
 * @typedef {Object} Board
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * Get list of all boards
 * @returns {Promise<Board[]>}
 */
const getAllBoards = async () => {
    const boards = await knex("Boards").select();
    return boards;
};

/**
 * Get board by id
 * @param {string} id
 * @returns {Promise<Board>}
 */
const getBoardById = async (id) => {
    const board = await knex("Boards").where({ id }).first();
    return board;
};

/**
 * Create a new board
 * @param {object} board
 * @param {string} board.id
 * @param {string} board.name
 * @param {string} board.description
 * @returns {Promise<void>}
 */
const createBoard = async (board) => {
    await knex.transaction(async (trx) => {
        await trx("Boards").insert(board);
    });
};

/**
 * Update a board
 * @param {string} id - Board id
 * @param {object} [board]
 * @param {string} [board.name]
 * @param {string} [board.description]
 * @returns {Promise<void>}
 */
const updateBoard = async (id, board) => {
    await knex.transaction(async (trx) => {
        if (board?.name === undefined) {
            delete board.name;
        }

        if (board?.description === undefined) {
            delete board.description;
        }

        if (Object.keys(board).length > 0) {
            await trx("Boards").where({ id }).update(board);
        }
    });
};

/**
 * Delete a board
 * @param {string} id
 * @returns {Promise<void>}
 */
const destroyBoard = async (id) => {
    await knex.transaction(async (trx) => {
        await trx("Boards").where({ id }).del();
    });
};

module.exports = {
    getAllBoards,
    getBoardById,
    createBoard,
    updateBoard,
    destroyBoard,
};
