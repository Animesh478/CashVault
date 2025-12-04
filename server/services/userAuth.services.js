const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    return await UserModel.create({
      fullName: name,
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};

const createHashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const verifyPassword = async function (user, password) {
  try {
    const result = await bcrypt.compare(password, user.password);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const createJWT = function (user) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

const verifyJWT = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = {
  getUserByEmail,
  addUser,
  verifyPassword,
  createHashPassword,
  createJWT,
  verifyJWT,
};
