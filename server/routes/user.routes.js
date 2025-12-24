const express = require("express");
const { getCurrentUser } = require("../controllers/user.controller");
const authenticateUserMiddleware = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.route("/me").get(authenticateUserMiddleware, getCurrentUser);

module.exports = userRouter;
