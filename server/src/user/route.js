const express = require("express");
const router = express.Router();
const { index, create, destroy, update } = require("./service");
const { isAuthenticated } = require("../auth/middleware");
const {
    validateQueryUserIndex,
    validateRegister,
    validateChangePassword,
} = require("./validate");

router.get("/", isAuthenticated, validateQueryUserIndex, index);
router.post("/", isAuthenticated, validateRegister, create);
router.patch("/:username", isAuthenticated, validateChangePassword, update);
router.delete("/:username", isAuthenticated, destroy);

module.exports = router;
