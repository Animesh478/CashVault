const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  TransactionalEmailsApi,
  SendSmtpEmail,
  TransactionalEmailsApiApiKeys,
} = require("@getbrevo/brevo");
const { getUserByEmail } = require("./user.service");
const { ForgotPasswordModel, UserModel } = require("../models");
const { getRequestRecord } = require("./forgotPassword.service");

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
    phoneNumber: user.phoneNumber,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

const verifyJWT = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

const sendPasswordResetEmail = async function (email) {
  try {
    const userInstance = await getUserByEmail(email);
    if (!userInstance) {
      return null;
    }
    const user = userInstance.toJSON();

    const entryInstance = await ForgotPasswordModel.create({ userId: user.id });
    const entry = entryInstance.toJSON();

    const resetLink = `http://127.0.0.1:5500/client/pages/reset-password.html?id=${entry.id}`;

    let emailAPI = new TransactionalEmailsApi();
    emailAPI.setApiKey(
      TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const message = new SendSmtpEmail();
    message.subject = "Reset password Link";
    message.htmlContent = `
    <h3>Below is your reset password link</h3>
    <a href=${resetLink}>Click Here to reset password</a>
  `;
    message.sender = {
      name: "CashVault",
      email: "animeshmohanty.am@gmail.com",
    };
    message.to = [{ email: "mohantyanimesh.96@gmail.com", name: "Recipient" }];

    return await emailAPI.sendTransacEmail(message);
  } catch (error) {
    console.log(error);
  }
};

const checkResetUrlValidity = async function (id) {
  try {
    const record = await getRequestRecord(id);
    console.log("record=", record);
    return record;
  } catch (error) {
    console.log(error);
  }
};

const updatePassword = async function (id, newPassword) {
  try {
    const hashedPassword = await createHashPassword(newPassword);
    const record = await getRequestRecord(id);
    const userId = record.userId;
    await UserModel.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    // the same link can't be used again
    await ForgotPasswordModel.update(
      {
        isActive: false,
      },
      {
        where: {
          id: record.id,
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  verifyPassword,
  createHashPassword,
  createJWT,
  verifyJWT,
  sendPasswordResetEmail,
  checkResetUrlValidity,
  updatePassword,
};
