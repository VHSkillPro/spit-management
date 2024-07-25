require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sequelize = require("./models");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:3001",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ------------ Register router ------------
const authMiddleware = require("./src/auth/authMiddleware");

const authRouter = require("./src/auth/authRouter");
const userRouter = require("./src/user/userRouter");
// const roleRouter = require("./src/role/route");
// const permissionRouter = require("./src/permission/route");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authMiddleware.isAuthenticated, userRouter);
// app.use("/api/v1/roles", isAuthenticated, roleRouter);
// app.use("/api/v1/permissions", isAuthenticated, permissionRouter);
// ------------------------------------------

app.use(async (error, req, res, next) => {
    return res.status(error.statusCode).json({
        message: error.statusCode === 500 ? "Lỗi máy chủ" : error.message,
    });
});

module.exports = app;
