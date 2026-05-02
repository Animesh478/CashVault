const express = require("express");
const authenticateUserMiddleware = require("../middlewares/auth.middleware");
const {
  addExpense,
  deleteExpense,
  fetchCurrentYearExpenses,
  getExpenses,
  downloadExpensesTextFile,
} = require("../controllers/expense.controller");

const expenseRouter = express.Router();

expenseRouter.route("/addExpense").post(authenticateUserMiddleware, addExpense);

expenseRouter
  .route("/allExpenses")
  .get(authenticateUserMiddleware, getExpenses);

expenseRouter
  .route("/downloadAll")
  .get(authenticateUserMiddleware, downloadExpensesTextFile);

expenseRouter
  .route("/deleteExpense/:expenseId")
  .delete(authenticateUserMiddleware, deleteExpense);

expenseRouter
  .route("/generateReport")
  .get(authenticateUserMiddleware, fetchCurrentYearExpenses);

module.exports = expenseRouter;
