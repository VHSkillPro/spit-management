const express = require("express");
const router = express.Router();
const userHandler = require("./userHandler");
const userValidator = require("./userValidator");
const authMiddleware = require("../auth/authMiddleware");

router.get(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("user.index"),
    userValidator.validateFilterUser,
    userHandler.index
);

router.get(
    "/:username",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("user.show"),
    userHandler.show
);

router.post(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("user.create"),
    userValidator.validateCreateUser,
    userHandler.create
);

router.patch(
    "/:username",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("user.update"),
    userValidator.validateUpdateUser,
    userHandler.update
);

router.delete(
    "/:username",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("user.destroy"),
    userHandler.destroy
);

module.exports = router;
