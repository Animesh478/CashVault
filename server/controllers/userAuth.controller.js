const { addUser, getUserByEmail } = require("../services/user.service");
const {
  verifyPassword,
  createHashPassword,
  createJWT,
  sendPasswordResetEmail,
  checkResetUrlValidity,
  updatePassword,
} = require("../services/userAuth.service");
const logger = require("../utils/logger");

const userSignUp = async function (req, res, next) {
  const { name, email, password, phoneNumber } = req.body;
  try {
    // checking if the user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await createHashPassword(password);
    const user = await addUser({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    const redirectURL = "http://localhost:5500/client/pages/login.html";
    return res
      .status(201)
      .json({ success: "User added successfully", user, redirectURL });
  } catch (error) {
    logger.error("User cannot be added", {
      email,
      error: error.message,
      stack: error.stack,
    });
    error.statusCode = 500;
    next(error);
  }
};

const userLogin = async function (req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email); //returns a Sequelize Model instance

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // if the user exists, verify the password
    const userObj = user.toJSON(); // converts the instance into js object
    const result = await verifyPassword(userObj, password);
    if (result) {
      const token = createJWT(userObj);

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      });
      const redirectURL = `${process.env.FRONTEND_URL}/client/pages/dashboard.html`;
      return res.status(200).json({ message: "Login successful", redirectURL });
    } else {
      logger.warn("Incorrect credentials", {
        userId: user.id,
      });
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    logger.error("Login failed", {
      email,
      error: error.message,
      stack: error.stack,
    });
    error.statusCode = 500;
    next(error);
  }
};

const forgotPassword = async function (req, res, next) {
  const { email } = req.body;
  try {
    const result = await sendPasswordResetEmail(email);

    if (!result) {
      return res.status(400).json({
        message: "If the email is registered, a reset link will be sent",
      });
    }

    res.status(200).json({
      message: "Reset password link has been sent to your registered email",
    });
  } catch (error) {
    logger.error("Forgot password failed", {
      email,
      error: error.message,
      stack: error.stack,
    });

    error.statusCode = 500;
    next(error);
  }
};

const resetPassword = async function (req, res, next) {
  const { id } = req.params;
  try {
    const record = await checkResetUrlValidity(id);

    if (!(record && record.isActive)) {
      return res
        .status(410)
        .json({ message: "Record doesnot exist or Reset link has expired" });
    }

    res.status(200).json({ message: "Reset link is valid" });
  } catch (error) {
    logger.error("Could not reset password", {
      resetId: id,
      error: error.message,
      stack: error.stack,
    });

    error.statusCode = 500;
    next(error);
  }
};

const changePassword = async function (req, res, next) {
  try {
    const { urlId, newPassword } = req.body;
    await updatePassword(urlId, newPassword);

    const redirectURL = `${process.env.FRONTEND_URL}/client/pages/login.html`;
    return res
      .status(200)
      .json({ success: "Password updated successfully", redirectURL });
  } catch (error) {
    logger.error("Could not update password", {
      email,
      error: error.message,
      stack: error.stack,
    });

    error.statusCode = 500;
    next(error);
  }
};

const userLogout = function (req, res) {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });
  const redirectURL = `${process.env.FRONTEND_URL}/client/pages/login.html`;
  res
    .status(200)
    .json({ success: "You have been logged out successfully", redirectURL });
};

module.exports = {
  userSignUp,
  userLogin,
  forgotPassword,
  resetPassword,
  changePassword,
  userLogout,
};
