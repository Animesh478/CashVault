const { UserModel } = require("../models/index");
const { getUserExpenses } = require("./expense.service");

const addUser = async function ({ name, email, password, phoneNumber }) {
  try {
    return await UserModel.create({
      fullName: name,
      email,
      password,
      phoneNumber,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserByEmail = async function (email) {
  try {
    return await UserModel.findOne({
      where: {
        email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTotalExpenses = async function (expenseAmount, userId) {
  try {
    // total expense = total expense + expenseAmount
    await UserModel.increment(
      {
        totalExpenses: expenseAmount,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addUser,
  getUserByEmail,
  updateTotalExpenses,
};
