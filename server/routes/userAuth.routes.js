const express = require("express");
const { userSignUp } = require("../controllers/userAuth.controller");

const router = express.Router();

router.route("/signUp").post(userSignUp);

module.exports = router;
