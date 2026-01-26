const { getUserData } = require("../services/user.service");
const logger = require("../utils/logger");

const getCurrentUser = async function (req, res) {
  const user = req.user;
  if (!req.user) {
    return res.status(401).json({ message: "User not authorized" });
  }
  try {
    const result = await getUserData(user.email);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user: result });
  } catch (error) {
    logger.error("Failed to fetch user", {
      userId: user?.id,
      body: req.body,
      error: error.message,
      stack: error.stack,
    });

    error.statusCode = 500;
    next(error);
  }
};

module.exports = {
  getCurrentUser,
};
