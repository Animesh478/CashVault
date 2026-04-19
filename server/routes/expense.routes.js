const express = require("express");
const authenticateUserMiddleware = require("../middlewares/auth.middleware");
const {
  addExpense,
  deleteExpense,
  fetchCurrentYearExpenses,
  getExpenses,
  downloadAllExpenses,
} = require("../controllers/expense.controller");

const expenseRouter = express.Router();

expenseRouter.route("/addExpense").post(authenticateUserMiddleware, addExpense);

expenseRouter
  .route("/allExpenses")
  .get(authenticateUserMiddleware, getExpenses);

expenseRouter
  .route("/downloadAll")
  .get(authenticateUserMiddleware, downloadAllExpenses);

expenseRouter
  .route("/deleteExpense/:expenseId")
  .delete(authenticateUserMiddleware, deleteExpense);

expenseRouter
  .route("/generateReport")
  .get(authenticateUserMiddleware, fetchCurrentYearExpenses);

module.exports = expenseRouter;
