const express = require("express");
const router = express.Router();
const permissionHandler = require("./permissionHandler");
const authMiddleware = require("../auth/authMiddleware");

router.get(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("permission.index"),
    permissionHandler.index
);

router.get(
    "/:permissionId",
    authMiddleware.isAuthenticated,
    authMiddleware.checkPermission("permission.show"),
    permissionHandler.show
);

module.exports = router;
