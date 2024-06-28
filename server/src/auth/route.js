const express = require("express");
const router = express.Router();
const service = require("./service");
const validate = require("./validate");
const middleware = require("./middleware");

router.get("/me", middleware.isAuthenticated, service.me);

router.post("/logout", service.logout);
router.post("/refresh_token", service.refreshAccessToken);
router.post("/login", validate.validateLogin, service.login);
router.post("/register", validate.validateRegister, service.register);

module.exports = router;
