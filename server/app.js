require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const knex = require("./knex/knex");
const { rateLimit } = require("express-rate-limit");

const app = express();
const corsOptions = {
    origin: "http://localhost:3001",
    credentials: true,
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
});

app.use(limiter);
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// // ------------ Register router ------------
const authRouter = require("./src/auth/authRouter");
const userRouter = require("./src/user/userRouter");
// const roleRouter = require("./src/role/roleRouter");
// // const permissionRouter = require("./src/permission/route");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/roles", authMiddleware.isAuthenticated, roleRouter);
// // app.use("/api/v1/permissions", isAuthenticated, permissionRouter);
// // ------------------------------------------

// Handle error
const AppError = require("./utils/AppError");
const { StatusCodes } = require("http-status-codes");

app.use(async (error, req, res, next) => {
    if (error instanceof AppError) {
        if (error.statusCode === 500) {
            console.log(error);
        }

        return res.status(error.statusCode).json({
            message: error.statusCode === 500 ? "Lỗi máy chủ" : error.message,
        });
    }

    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Lỗi máy chủ",
    });
});

module.exports = app;
