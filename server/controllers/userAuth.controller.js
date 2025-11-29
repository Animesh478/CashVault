const {
  getUserByEmail,
  addUser,
  verifyPassword,
} = require("../services/userAuth.services");

const userSignUp = async function (req, res) {
  const { name, email, password } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(404).json({ error: "User already exists" });
    }
  } catch (error) {
    console.log(error);
  }

  const user = await addUser({ name, email, password });
  return res.json({ success: "User added successfully", user });
};
const userLogin = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // if the user exists, verify the password
    const result = await verifyPassword(user, password);
    if (result) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ error: "User not authorized" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userSignUp,
  userLogin,
};
