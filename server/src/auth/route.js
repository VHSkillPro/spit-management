const express = require("express");
const router = express.Router();
const { me, refreshTokens, login, logout } = require("./service");
const { validateLogin } = require("./validate");
const { isAuthenticated } = require("./middleware");

router.get("/me", isAuthenticated, me);
router.post("/refresh_tokens", refreshTokens);
router.post("/login", validateLogin, login);
router.post("/logout", isAuthenticated, logout);

module.exports = router;
