const { generateCategory } = require("../services/aiCategory.service");
const {
  getUserExpenses,
  createUserExpense,
  deleteExpenseFromDB,
  getCurrentYearExpenses,
} = require("../services/expense.service");
const { updateTotalExpenses } = require("../services/user.service");

const addExpense = async function (req, res) {
  const { expenseAmount, description, category } = req.body;
  const user = req.user;

  try {
    await updateTotalExpenses(expenseAmount, user.id); //update the total expenses for a user
    // //? determine the category using ai
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
  // const year = req.query();
  console.log("user=", user);
  try {
    const result = await getUserExpenses(user.id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const deleteExpense = async function (req, res) {
  // const { id, userId } = req.body;
  const { expenseId } = req.params;
  const user = req.user;

  console.log("user=", req.user);
  console.log("expense id=", expenseId);
  const userId = user.id;
  // get userId from req.user
  // expenseid = req.params
  try {
    const deletedExpense = await deleteExpenseFromDB(expenseId, userId);
    return res.status(201).json({ result: deletedExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const fetchCurrentYearExpenses = async function (req, res) {
  const user = req.user;
  try {
    const result = await getCurrentYearExpenses(user.id);
    console.log("expense=", result);
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
  deleteExpense,
  fetchCurrentYearExpenses,
};
