const { UserModel, sequelize } = require("../models/index");
// const { createHashPassword } = require("./userAuth.service");

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
    throw error;
  }
};

const getUserData = async function (email) {
  try {
    const user = await getUserByEmail(email);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const updateTotalExpenses = async function (expenseAmount, userId) {
  try {
    const t = await sequelize.transaction();
    // total expense = total expense + expenseAmount
    await UserModel.increment(
      {
        totalExpenses: expenseAmount,
      },
      {
        where: {
          id: userId,
        },
      },
      {
        transaction: t,
      }
    );
    await t.commit();
  } catch (error) {
    console.log(error);
    await t.rollback();
  }
};

module.exports = {
  addUser,
  getUserByEmail,
  updateTotalExpenses,
  getUserData,
};
