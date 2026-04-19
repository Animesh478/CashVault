// import { v4 as uuidv4 } from "uuid";
const { v4: uuidv4 } = require("uuid");

const { generateCategory } = require("../services/aiCategory.service");
const uploadToS3 = require("../services/aws.service");
const {
  getUserExpenses,
  createUserExpense,
  deleteExpenseFromDB,
  getCurrentYearExpenses,
  getAllExpenses,
} = require("../services/expense.service");
const { updateTotalExpenses } = require("../services/user.service");
const logger = require("../utils/logger");

const addExpense = async function (req, res, next) {
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
      user,
    );

    return res.status(201).json({ message: "Expense added", newExpense });
  } catch (error) {
    logger.error("Failed to add expense", {
      userId: user?.id,
      body: req.body,
      error: error.message,
      stack: error.stack,
    });

    error.statusCode = 500;
    next(error);
  }
};

const getExpenses = async function (req, res, next) {
  const user = req.user;
  const { page, limit } = req.query;

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

    const result = expenses.slice(0, limit);
    res.status(200).json({ result, hasNextPage });
  } catch (error) {
    logger.error("Failed to fetch expenses", {
      userId: user?.id,
      body: req.body,
      error: error.message,
      stack: error.stack,
    });

    error.statusCode = 500;
    next(error);
  }
};

const downloadAllExpenses = async function (req, res, next) {
  const user = req.user;
  try {
    const result = await getAllExpenses(user.id);
    let fileContent = "";
    result.forEach(
      (expense) =>
        (fileContent += `Date: ${expense.createdAt} Amount: ${expense.expenseAmount} Category: ${expense.category} Description: ${expense.description}\n`),
    );
    const fileName = `expenses-${uuidv4()}.txt`;
    const generatedUrl = await uploadToS3(fileContent, fileName);
    console.log(fileContent);
    res.status(200).json({ success: true, downloadUrl: generatedUrl });
  } catch (error) {
    logger.error("Failed to download all expenses", {
      userId: user?.id,
      body: req.body,
      error: error.message,
      stack: error.stack,
    });
    error.statusCode = 500;
    next(error);
  }
};

const deleteExpense = async function (req, res, next) {
  const { expenseId } = req.params;
  const user = req.user;
  const userId = user.id;

  try {
    const deletedExpense = await deleteExpenseFromDB(expenseId, userId);
    return res.status(201).json({ result: deletedExpense });
  } catch (error) {
    logger.error("Failed to delete expense", {
      userId: user?.id,
      body: req.body,
      error: error.message,
      stack: error.stack,
    });

    error.statusCode = 500;
    next(error);
  }
};

const fetchCurrentYearExpenses = async function (req, res, next) {
  const user = req.user;
  try {
    const result = await getCurrentYearExpenses(user.id);
    res.status(200).json({ result });
  } catch (error) {
    logger.error("Failed to fetch current year expense", {
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
  addExpense,
  getExpenses,
  downloadAllExpenses,
  deleteExpense,
  fetchCurrentYearExpenses,
};
