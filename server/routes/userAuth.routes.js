const express = require("express");
const {
  userSignUp,
  userLogin,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/userAuth.controller");

const userAuthRouter = express.Router();

userAuthRouter.route("/signUp").post(userSignUp);
userAuthRouter.route("/login").post(userLogin);
userAuthRouter.route("/forgot-password").post(forgotPassword);
userAuthRouter.route("/resetPassword/:id").get(resetPassword);
userAuthRouter.route("/change-password").post(changePassword);

module.exports = userAuthRouter;
