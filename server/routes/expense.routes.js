const express = require("express");
const authenticateUserMiddleware = require("../middlewares/auth.middleware");
const {
  addExpense,
  getAllExpenses,
  deleteExpense,
} = require("../controllers/expense.controller");

const expenseRouter = express.Router();

expenseRouter.route("/addExpense").post(authenticateUserMiddleware, addExpense);
expenseRouter
  .route("/allExpenses")
  .get(authenticateUserMiddleware, getAllExpenses);
expenseRouter
  .route("/deleteExpense/:expenseId")
  .delete(authenticateUserMiddleware, deleteExpense);

module.exports = expenseRouter;
