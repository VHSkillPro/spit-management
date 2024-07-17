const express = require("express");
const router = express.Router();
const service = require("./service");
const middleware = require("../auth/middleware");

router.get("/", middleware.isAuthenticated, service.index);

module.exports = router;
