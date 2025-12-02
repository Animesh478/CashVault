const { ExpenseModel } = require("../models/index");

const getExpensesFromDatabase = async function () {
  const result = await ExpenseModel.findAll();
  return result;
};

module.exports = {
  getExpensesFromDatabase,
};
