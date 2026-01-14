const { Op } = require("sequelize");
const { ExpenseModel, sequelize } = require("../models/index");

const getUserExpenses = async function (options) {
  const userId = options.user.userId;
  const rawPage = Number(options.pagination.page);
  const page = isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const limit = options.pagination.limit * 1;
  const sortingOrder = options.sorting.order;

  try {
    const result = await ExpenseModel.findAll({
      where: {
        userId: userId,
      },
      order: [["createdAt", sortingOrder]],
      offset: (page - 1) * limit,
      limit: limit + 1,
      raw: true,
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
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
  let t;
  try {
    t = await sequelize.transaction();
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
