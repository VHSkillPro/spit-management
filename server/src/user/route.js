const express = require("express");
const router = express.Router();
const { index, create, destroy, update } = require("./service");
const {
    validateQueryUserIndex,
    validateRegister,
    validateChangePassword,
} = require("./validate");

router.get("/", validateQueryUserIndex, index);
router.post("/", validateRegister, create);
router.patch("/:username", validateChangePassword, update);
router.delete("/:username", destroy);

module.exports = router;
