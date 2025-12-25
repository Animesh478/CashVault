const { generateCategory } = require("../services/aiCategory.service");
const {
  getUserExpenses,
  createUserExpense,
} = require("../services/expense.service");
const { updateTotalExpenses } = require("../services/user.service");

const addExpense = async function (req, res) {
  const { expenseAmount, description, category } = req.body;
  const user = req.user;
  console.log("inside expense=", user);
  console.log(category);
  try {
    await updateTotalExpenses(expenseAmount, user.id); //update the total expenses for a user
    //? determine the category using ai
    let generatedCategory;
    if (category === "other") {
      generatedCategory = await generateCategory(description);
    } else {
      generatedCategory = category;
    }

    const newExpense = await createUserExpense(
      expenseAmount,
      description,
      generatedCategory,
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

module.exports = {
  addExpense,
  getAllExpenses,
};
