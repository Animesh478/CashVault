const express = require("express");
const authenticateUserMiddleware = require("../middlewares/auth.middleware");
const processPayment = require("../controllers/payment.controller");

const paymentRouter = express.Router();

paymentRouter
  .route("/create-order")
  .post(authenticateUserMiddleware, processPayment);

paymentRouter.route("/payment-status").get((req, res) => {
  res.status(200).send("Hello User");
});
module.exports = paymentRouter;
