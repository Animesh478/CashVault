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
  const { page, limit } = req.query;
  console.log("page=", page);
  let hasNextPage = false;
  const options = {
    user: {
      userId: user.id,
    },
    pagination: {
      page,
      limit,
    },
    sorting: {
      order: "DESC",
    },
  };

  try {
    const expenses = await getUserExpenses(options);
    if (expenses.length > limit) {
      hasNextPage = true;
    }
    // console.log("result-", result.length);
    const result = expenses.slice(0, limit);
    res.status(200).json({ result, hasNextPage });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const deleteExpense = async function (req, res) {
  const { expenseId } = req.params;
  const user = req.user;
  const userId = user.id;

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
  const options = {
    user: {
      userId: user.id,
    },
    date: {
      currentYear: new Date().getFullYear(),
    },
  };
  try {
    const result = await getCurrentYearExpenses(user.id);
    // const result = await getUserExpenses(options);
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
