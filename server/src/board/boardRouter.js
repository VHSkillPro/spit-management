const express = require("express");
const router = express.Router();
const boardHandler = require("./boardHandler");
const boardValidator = require("./boardValidator");
const authMiddleware = require("../auth/authMiddleware");

router.get(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("board.index"),
    boardHandler.index
);

router.get(
    "/:boardId",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("board.show"),
    boardHandler.show
);

router.post(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("board.create"),
    boardValidator.validateCreateBoard,
    boardHandler.create
);

router.patch(
    "/:boardId",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("board.update"),
    boardValidator.validateUpdateBoard,
    boardHandler.update
);

router.delete(
    "/:boardId",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("board.destroy"),
    boardHandler.destroy
);

module.exports = router;
