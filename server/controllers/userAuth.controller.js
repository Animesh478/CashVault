const { addUser, getUserByEmail } = require("../services/user.service");
const {
  verifyPassword,
  createHashPassword,
  createJWT,
} = require("../services/userAuth.service");

const userSignUp = async function (req, res) {
  const { name, email, password, phoneNumber } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(404).json({ error: "User already exists" });
    }
  } catch (error) {
    console.log(error);
  }

  const hashedPassword = await createHashPassword(password);
  const user = await addUser({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
  });
  const redirectURL = "http://localhost:5500/client/pages/login.html";
  return res.json({ success: "User added successfully", user, redirectURL });
};

const userLogin = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email); //returns a Sequelize Model instance
    const userObj = user.toJSON(); // converts the instance into js object
    console.log("user auth=", userObj);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // if the user exists, verify the password
    const result = await verifyPassword(user, password);
    if (result) {
      const token = createJWT(userObj);
      // console.log("token:", token);
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });
      const redirectURL = "http://localhost:5500/client/pages/dashboard.html";
      return res
        .status(200)
        .json({ message: "Login successful", token, redirectURL });
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
