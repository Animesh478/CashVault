const { getUserData } = require("../services/user.service");

const getCurrentUser = async function (req, res) {
  const user = req.user;
  if (!req.user) {
    return res.status(401).json({ message: "User not authorized" });
  }
  try {
    const result = await getUserData(user.email);
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCurrentUser,
};
