const express = require("express");
const authRouter = require("./auth/authRouter");
const userRouter = require("./user/userRouter");
const roleRouter = require("./role/roleRouter");

/**
 * Define all the routes here
 * @param {express.Application} app
 */
const appRouters = (app) => {
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/roles", roleRouter);
};

module.exports = appRouters;
