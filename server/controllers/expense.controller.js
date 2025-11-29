const { ExpenseModel } = require("../models/index");

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

module.exports = {
  addExpense,
};
