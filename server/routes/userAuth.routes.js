const express = require("express");
const router = express.Router();

router.route("/signUp").post((req, res) => {
  console.log("user sign up");
});

module.exports = router;
