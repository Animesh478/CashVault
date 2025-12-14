const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createHashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const verifyPassword = async function (user, password) {
  try {
    const result = await bcrypt.compare(password, user.password);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const createJWT = function (user) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.fullName,
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
  verifyPassword,
  createHashPassword,
  createJWT,
  verifyJWT,
};
