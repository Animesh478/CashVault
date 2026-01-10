const { Op } = require("sequelize");
const { ExpenseModel, sequelize } = require("../models/index");

const getUserExpenses = async function (userId) {
  const result = await ExpenseModel.findAll({
    where: {
      userId: userId,
    },
  });
  return result;
};

const getCurrentYearExpenses = async function (userId) {
  const currentYear = new Date().getFullYear();
  try {
    const result = await ExpenseModel.findAll({
      where: {
        userId,
        createdAt: {
          [Op.gte]: new Date(currentYear, 0, 1),
          [Op.lt]: new Date(currentYear + 1, 0, 1),
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const createUserExpense = async function (
  expenseAmount,
  description,
  category,
  user
) {
  const t = await sequelize.transaction();
  try {
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
    console.log("expense=", newExpense.toJSON());
    return newExpense.toJSON();
  } catch (error) {
    console.log(error);
    await t.rollback();
    throw error;
  }
};

const deleteExpenseFromDB = async function (expenseId, userId) {
  let t;
  try {
    t = await sequelize.transaction();
    const deletedExpense = await ExpenseModel.destroy(
      {
        where: {
          id: expenseId,
          userId,
        },
      },
      {
        transaction: t,
      }
    );
    await t.commit();
    return deletedExpense;
  } catch (error) {
    console.log(error);
    await t.rollback();
  }
};

module.exports = {
  getUserExpenses,
  createUserExpense,
  deleteExpenseFromDB,
  getCurrentYearExpenses,
};
