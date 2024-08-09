const express = require("express");
const semesterService = require("./semesterService");
const semesterMessage = require("./semesterMessage");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../../utils/AppError");

/**
 * Handler get list of all semesters
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const index = async (req, res, next) => {
    try {
        const semesters = await semesterService.getAllSemesters();

        return res.status(StatusCodes.OK).json({
            data: {
                semesters,
            },
            messages: semesterMessage.INDEX,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler get semester by id
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const show = async (req, res, next) => {
    try {
        const semesterId = req.params.semesterId;
        const semester = await semesterService.getSemesterById(semesterId);

        if (!semester) {
            return next(
                new AppError(
                    StatusCodes.NOT_FOUND,
                    semesterMessage.SEMESTER_NOT_FOUND
                )
            );
        }

        return res.status(StatusCodes.OK).json({
            data: {
                semester,
            },
            messages: semesterMessage.SHOW,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler create a new semester
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const create = async (req, res, next) => {
    try {
        const semesterId = req.body.id;
        const semesterName = req.body.name;

        // Check semester existed
        const semester = await semesterService.getSemesterById(semesterId);
        if (semester) {
            return next(
                new AppError(
                    StatusCodes.CONFLICT,
                    semesterMessage.SEMESTER_EXISTED
                )
            );
        }

        await semesterService.createSemester({
            id: semesterId,
            name: semesterName,
        });

        return res.status(StatusCodes.CREATED).json({
            messages: semesterMessage.CREATE,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler update a semester
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const update = async (req, res, next) => {
    try {
        const semesterId = req.params.semesterId;
        const semesterName = req.body.name;

        const semester = await semesterService.getSemesterById(semesterId);
        if (!semester) {
            return next(
                new AppError(
                    StatusCodes.NOT_FOUND,
                    semesterMessage.SEMESTER_NOT_FOUND
                )
            );
        }

        await semesterService.updateSemester(semesterId, {
            name: semesterName,
        });

        return res.status(StatusCodes.OK).json({
            messages: semesterMessage.UPDATE,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler delete a semester
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const destroy = async (req, res, next) => {
    try {
        const semesterId = req.params.semesterId;
        const semester = await semesterService.getSemesterById(semesterId);

        if (!semester) {
            return next(
                new AppError(
                    StatusCodes.NOT_FOUND,
                    semesterMessage.SEMESTER_NOT_FOUND
                )
            );
        }

        await semesterService.destroySemester(semesterId);

        return res.status(StatusCodes.OK).json({
            messages: semesterMessage.DESTROY,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
