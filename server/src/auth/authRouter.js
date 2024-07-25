const express = require("express");
const router = express.Router();
const authHandler = require("./authHandler");
const authMiddleware = require("./authMiddleware");
const authValidator = require("./authValidator");

router.get("/me", authMiddleware.isAuthenticated, authHandler.me);
router.post("/refresh_tokens", authHandler.refreshTokens);
router.post("/login", authValidator.validateLogin, authHandler.login);
router.post("/logout", authMiddleware.isAuthenticated, authHandler.logout);

module.exports = router;
