const {
  getUserExpenses,
  createUserExpense,
} = require("../services/expense.service");
const { getUserByEmail } = require("../services/userAuth.services");

const addExpense = async function (req, res) {
  const { expenseAmount, description, category } = req.body;
  const user = req.user;
  console.log("inside expense=", user);

  try {
    const newExpense = await createUserExpense(
      expenseAmount,
      description,
      category,
      user
    );

    return res.status(201).json({ message: "Expense added", newExpense });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
};

const getAllExpenses = async function (req, res) {
  const user = req.user;
  try {
    const result = await getUserExpenses(user.id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const getUserData = async function (req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "User not authorized" });
  }
  try {
    const user = await getUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
  getUserData,
};
