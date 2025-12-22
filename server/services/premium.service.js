const { raw } = require("mysql2");
const { UserModel, ExpenseModel, sequelize } = require("../models");

const getAllUsersAndExpenses = async function () {
  try {
    const result = await UserModel.findAll({
      attributes: [
        "full_name",
        [
          sequelize.fn("SUM", sequelize.col("Expenses.expense_amount")),
          "totalExpense",
        ],
      ],
      include: [
        {
          model: ExpenseModel,
          attributes: [],
        },
      ],
      group: ["User.id"],
      order: [[sequelize.literal("totalExpense"), "DESC"]],
      raw: true,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsersAndExpenses,
};
