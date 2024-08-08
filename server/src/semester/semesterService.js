const knex = require("../../knex/knex");

/**
 * @typedef {Object} Semester
 * @property {string} id
 * @property {string} name
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * Get list of all semesters
 * @returns {Promise<Semester[]>}
 */
const getAllSemesters = async () => {
    const semesters = knex("Semesters").select();
    return semesters;
};

/**
 * Get semester by id
 * @param {string} id
 * @returns {Promise<Semester>}
 */
const getSemesterById = async (id) => {
    const semester = knex("Semesters").where({ id }).first();
    return semester;
};

/**
 * Create a new semester
 * @param {object} semester
 * @param {string} semester.id
 * @param {string} semester.name
 * @returns {Promise<void>}
 */
const createSemester = async (semester) => {
    await knex.transaction(async (trx) => {
        await trx("Semesters").insert(semester);
    });
};

module.exports = {
    getAllSemesters,
    getSemesterById,
    createSemester,
};
