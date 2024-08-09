const express = require("express");
const router = express.Router();
const semesterHandler = require("./semesterHandler");
const authMiddleware = require("../auth/authMiddleware");
const semesterValidator = require("./semesterValidator");

router.get(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("semester.index"),
    semesterHandler.index
);

router.get(
    "/:semesterId",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("semester.show"),
    semesterHandler.show
);

router.post(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("semester.create"),
    semesterValidator.validateCreateSemester,
    semesterHandler.create
);

router.patch(
    "/:semesterId",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("semester.update"),
    semesterValidator.validateUpdateSemester,
    semesterHandler.update
);

router.delete(
    "/:semesterId",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("semester.destroy"),
    semesterHandler.destroy
);

module.exports = router;
