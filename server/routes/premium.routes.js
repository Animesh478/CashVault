const express = require("express");
const { showLeaderboard } = require("../controllers/premium.controller");
const authenticateUserMiddleware = require("../middlewares/auth.middleware");

const premiumRouter = express.Router();

premiumRouter
  .route("/leaderboard")
  .get(authenticateUserMiddleware, showLeaderboard);

module.exports = premiumRouter;
