const express = require("express");
const authRouter = require("./auth/authRouter");
const userRouter = require("./user/userRouter");
const roleRouter = require("./role/roleRouter");
const permissionRouter = require("./permission/permissionRouter");

/**
 * Define all the routes here
 * @param {express.Application} app
 */
const appRouters = (app) => {
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/roles", roleRouter);
    app.use("/api/v1/permissions", permissionRouter);
};

module.exports = appRouters;
