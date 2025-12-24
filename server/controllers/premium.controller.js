const { getUserAndAggregateExpense } = require("../services/premium.service");
const { getUserByEmail } = require("../services/user.service");

const showLeaderboard = async function (req, res) {
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
    console.log(error);
    res.status(400).json({ success: false, error });
  }
};

module.exports = { showLeaderboard };
