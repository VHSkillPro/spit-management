const express = require("express");
const boardMessage = require("./boardMessage");
const boardService = require("./boardService");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../../utils/AppError");

/**
 * Handler get list of all boards
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const index = async (req, res, next) => {
    try {
        const boards = await boardService.getAllBoards();

        return res.status(StatusCodes.OK).json({
            data: {
                boards,
            },
            message: boardMessage.INDEX,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler get a board by id
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const show = async (req, res, next) => {
    try {
        const boardId = req.params.boardId;
        const board = await boardService.getBoardById(boardId);

        if (!board) {
            return next(
                new AppError(
                    StatusCodes.NOT_FOUND,
                    boardMessage.BOARD_NOT_FOUND
                )
            );
        }

        return res.status(StatusCodes.OK).json({
            data: {
                board,
            },
            message: boardMessage.SHOW,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler create a new board
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const create = async (req, res, next) => {
    try {
        const { id, name, description } = req.body;
        const board = await boardService.getBoardById(id);

        if (board) {
            return next(
                new AppError(StatusCodes.CONFLICT, boardMessage.BOARD_EXISTED)
            );
        }

        await boardService.createBoard({ id, name, description });

        return res.status(StatusCodes.CREATED).json({
            message: boardMessage.CREATE,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler update a board
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const update = async (req, res, next) => {
    try {
        const boardId = req.params.boardId;
        const { name, description } = req.body;
        const board = await boardService.getBoardById(boardId);

        if (!board) {
            return next(
                new AppError(
                    StatusCodes.NOT_FOUND,
                    boardMessage.BOARD_NOT_FOUND
                )
            );
        }

        await boardService.updateBoard(boardId, { name, description });

        return res.status(StatusCodes.OK).json({
            message: boardMessage.UPDATE,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Handler delete a board
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const destroy = async (req, res, next) => {
    try {
        const boardId = req.params.boardId;
        const board = await boardService.getBoardById(boardId);

        if (!board) {
            return next(
                new AppError(
                    StatusCodes.NOT_FOUND,
                    boardMessage.BOARD_NOT_FOUND
                )
            );
        }

        await boardService.destroyBoard(boardId);

        return res.status(StatusCodes.OK).json({
            message: boardMessage.DESTROY,
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
