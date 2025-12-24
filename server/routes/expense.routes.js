const express = require("express");
const authenticateUserMiddleware = require("../middlewares/auth.middleware");
const {
  addExpense,
  getAllExpenses,
} = require("../controllers/expense.controller");

const expenseRouter = express.Router();

expenseRouter.route("/addExpense").post(authenticateUserMiddleware, addExpense);
expenseRouter
  .route("/allExpenses")
  .get(authenticateUserMiddleware, getAllExpenses);

module.exports = expenseRouter;
