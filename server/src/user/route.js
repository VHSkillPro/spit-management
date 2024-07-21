const express = require("express");
const router = express.Router();
const service = require("./service");
const validate = require("./validate");
const { checkPermission } = require("../auth/middleware");

// ------ Define router ---------
router.get(
    "/",
    checkPermission("user.index"),
    validate.validateQueryUserIndex,
    service.index
);

router.post(
    "/",
    checkPermission("user.create"),
    validate.validateRegister,
    service.create
);

router.patch(
    "/:username",
    checkPermission("user.update"),
    validate.validateUpdateUser,
    service.update
);

router.delete("/:username", checkPermission("user.destroy"), service.destroy);
// ------------------------------

module.exports = router;
