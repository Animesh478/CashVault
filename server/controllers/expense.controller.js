const { ExpenseModel } = require("../models/index");
const { getExpensesFromDatabase } = require("../services/expense.service");

const addExpense = async function (req, res) {
  const { expenseAmount, description, category } = req.body;
  console.log("amount:", typeof expenseAmount);
  const expense = await ExpenseModel.create({
    expenseAmount: Number(expenseAmount),
    description,
    category,
  });
  res.status(201).json({ message: "Expense added", expense });
};

const getAllExpenses = async function (req, res) {
  const result = await getExpensesFromDatabase();
  res.status(200).json(result);
};

module.exports = {
  addExpense,
  getAllExpenses,
};
