const express = require("express");
const { userSignUp, userLogin } = require("../controllers/userAuth.controller");

const router = express.Router();

router.route("/signUp").post(userSignUp);
router.route("/login").post(userLogin);

module.exports = router;
