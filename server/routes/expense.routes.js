const express = require("express");
const {
  addExpense,
  getAllExpenses,
} = require("../controllers/expense.controller");

const expenseRouter = express.Router();

expenseRouter.route("/addExpense").post(addExpense);
expenseRouter.route("/allExpenses").get(getAllExpenses);

module.exports = expenseRouter;
