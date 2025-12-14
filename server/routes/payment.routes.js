const express = require("express");
const authenticateUserMiddleware = require("../middlewares/auth.middleware");
const {
  processPayment,
  paymentStatus,
} = require("../controllers/payment.controller");

const paymentRouter = express.Router();

paymentRouter
  .route("/create-order")
  .post(authenticateUserMiddleware, processPayment);

paymentRouter.route("/payment-status").get(paymentStatus);

module.exports = paymentRouter;
