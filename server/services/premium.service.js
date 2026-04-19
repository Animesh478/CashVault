const { UserModel, ExpenseModel, sequelize } = require("../models");
const { getAllExpenses } = require("./expense.service");

const getUserAndAggregateExpense = async function () {
  try {
    const result = await UserModel.findAll({
      attributes: ["id", "full_name", "totalExpenses"],
      order: [[sequelize.literal("totalExpenses"), "DESC"]],
      raw: true,
    });
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllExpensesFile = async function () {
  try {
    const response = await getAllExpenses();
    console.log(response);
  } catch (error) {}
};

module.exports = {
  getUserAndAggregateExpense,
  getAllExpensesFile,
};
