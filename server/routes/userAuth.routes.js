const express = require("express");
const {
  userSignUp,
  userLogin,
  getUserData,
} = require("../controllers/userAuth.controller");

const router = express.Router();

router.route("/signUp").post(userSignUp);
router.route("/login").post(userLogin);
router.route("/getUser").get(getUserData);

module.exports = router;
