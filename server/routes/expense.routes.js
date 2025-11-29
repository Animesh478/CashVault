const express = require("express");
const { addExpense } = require("../controllers/expense.controller");

const expenseRouter = express.Router();

expenseRouter.route("/expense").post(addExpense);

module.exports = expenseRouter;
