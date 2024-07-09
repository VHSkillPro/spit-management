const express = require("express");
const router = express.Router();
const service = require("./service");
const validate = require("./validate");
const middleware = require("../auth/middleware");

router.get("/", middleware.isAuthenticated, service.index);
router.post(
    "/",
    middleware.isAuthenticated,
    validate.validateRegister,
    service.create
);
router.delete("/:username", middleware.isAuthenticated, service.destroy);

module.exports = router;
