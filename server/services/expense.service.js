const { ExpenseModel } = require("../models/index");

const getUserExpenses = async function (userId) {
  const result = await ExpenseModel.findAll({
    where: {
      userId: userId,
    },
  });
  return result;
};

const createUserExpense = async function (
  expenseAmount,
  description,
  category,
  user
) {
  return await ExpenseModel.create({
    expenseAmount: Number(expenseAmount),
    description,
    category,
    userId: user.id,
  });
};

module.exports = {
  getUserExpenses,
  createUserExpense,
};
