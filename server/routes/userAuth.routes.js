const express = require("express");
const { userSignUp, userLogin } = require("../controllers/userAuth.controller");

const userAuthRouter = express.Router();

userAuthRouter.route("/signUp").post(userSignUp);
userAuthRouter.route("/login").post(userLogin);

module.exports = userAuthRouter;
