const express = require("express");
const router = express.Router();
const service = require("./service");
const validate = require("./validate");
const middleware = require("./middleware");

router.get("/me", middleware.isAuthenticated, service.me);
router.post("/refresh_tokens", service.refreshTokens);
router.post("/login", validate.validateLogin, service.login);
router.post("/logout", middleware.isAuthenticated, service.logout);

module.exports = router;
