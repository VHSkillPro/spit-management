const express = require("express");
const router = express.Router();
const userHandler = require("./userHandler");
const userValidator = require("./userValidator");

router.get("/", userValidator.validateUsersFilter, userHandler.index);

router.get("/:username", userHandler.show);

module.exports = router;
