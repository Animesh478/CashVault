const { ExpenseModel, sequelize } = require("../models/index");

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
  try {
    const t = await sequelize.transaction();
    const newExpense = await ExpenseModel.create(
      {
        expenseAmount: Number(expenseAmount),
        description,
        category,
        userId: user.id,
      },
      {
        transaction: t,
      }
    );
    await t.commit();
    return newExpense;
  } catch (error) {
    console.log(error);
    await t.rollback();
  }
};

module.exports = {
  getUserExpenses,
  createUserExpense,
};
