const express = require("express");
const processPayment = require("../controllers/payment.controller");

const paymentRouter = express.Router();

paymentRouter.route("/create-order").post(processPayment);
paymentRouter.route("/payment-status").get((req, res) => {
  res.status(200).json({ status: "pending" });
});

module.exports = paymentRouter;
