const { getUserAndAggregateExpense } = require("../services/premium.service");
const { getUserByEmail } = require("../services/user.service");
const logger = require("../utils/logger");

const showLeaderboard = async function (req, res, next) {
  try {
    const result = await getUserAndAggregateExpense();
    const currentUser = await getUserByEmail(req.user.email);
    const rankedData = result.map((obj, index) => {
      const rank = index + 1;
      if (!obj.totalExpenses) {
        obj.totalExpenses = 0;
      }
      obj.full_name = obj.full_name.toUpperCase();
      return { rank, ...obj };
    });
    console.log(rankedData);
    return res
      .status(200)
      .json({ success: true, rankedData, userId: currentUser.id });
  } catch (error) {
    logger.error("Error encountered while showing leaderboard", {
      userId: user?.id,
      body: req.body,
      error: error.message,
      stack: error.stack,
    });

    error.statusCode = 500;
    next(error);
  }
};

module.exports = { showLeaderboard };
