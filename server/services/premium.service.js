const { UserModel, ExpenseModel, sequelize } = require("../models");

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
  }
};

module.exports = {
  getUserAndAggregateExpense,
};
