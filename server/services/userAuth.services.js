const bcrypt = require("bcrypt");

const { UserModel } = require("../models/index");

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

const addUser = async function ({ name, email, password }) {
  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        return await UserModel.create({
          fullName: name,
          email,
          password: hash,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyPassword = async function (user, password) {
  try {
    const result = await bcrypt.compare(password, user.password);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserByEmail,
  addUser,
  verifyPassword,
};
