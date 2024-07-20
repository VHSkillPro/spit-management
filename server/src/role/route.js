const express = require("express");
const router = express.Router();
const service = require("./service");
const { checkPermission } = require("../auth/middleware");

router.get("/", checkPermission("role.index"), service.index);

module.exports = router;
