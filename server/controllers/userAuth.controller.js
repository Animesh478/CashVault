const { getUserByEmail, addUser } = require("../services/userAuth.services");

const userSignUp = async function (req, res) {
  const { name, email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user) {
      return res.status(404).json({ error: "User already exists" });
    }
  } catch (error) {
    console.log(error);
  }

  await addUser({ name, email, password });
  return res.json({ success: "User added successfully" });
};

module.exports = {
  userSignUp,
};
