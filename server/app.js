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

// Register router - begin
const { isAuthenticated } = require("./src/auth/middleware");

const authRouter = require("./src/auth/route");
const userRouter = require("./src/user/route");
const roleRouter = require("./src/role/route");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", isAuthenticated, userRouter);
app.use("/api/v1/roles", isAuthenticated, roleRouter);
// Register router - end

module.exports = app;
