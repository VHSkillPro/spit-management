const express = require("express");
const router = express.Router();
const service = require("./service");
const validate = require("./validate");
const { checkPermission } = require("../auth/middleware");

router.get("/", checkPermission("role.index"), service.index);

router.post(
    "/",
    checkPermission("role.create"),
    validate.validateCreateRole,
    service.create
);

router.patch(
    "/:roleId",
    checkPermission("role.update"),
    validate.validateUpdateRole,
    service.update
);

module.exports = router;
