const express = require("express");
const router = express.Router();
const { index, create, destroy } = require("./service");

const { isAuthenticated } = require("../auth/middleware");
const { validateQueryUserIndex } = require("./validate");

router.get("/", isAuthenticated, validateQueryUserIndex, index);
// router.post("/", isAuthenticated, validate.validateRegister, create);
router.delete("/:username", isAuthenticated, destroy);

module.exports = router;
