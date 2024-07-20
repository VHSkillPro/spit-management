const express = require("express");
const router = express.Router();
const { index, create, destroy, update } = require("./service");
const {
    validateQueryUserIndex,
    validateRegister,
    validateChangePassword,
} = require("./validate");
const { checkPermission } = require("../auth/middleware");

router.get("/", checkPermission("user.index"), validateQueryUserIndex, index);
router.post("/", checkPermission("user.create"), validateRegister, create);
router.patch(
    "/:username",
    checkPermission("user.update"),
    validateChangePassword,
    update
);
router.delete("/:username", checkPermission("user.destroy"), destroy);

module.exports = router;
