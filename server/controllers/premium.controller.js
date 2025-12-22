const { getAllUsersAndExpenses } = require("../services/premium.service");

const showLeaderboard = async function (req, res) {
  try {
    const result = await getAllUsersAndExpenses();
    const rankedData = result.map((obj, index) => {
      const rank = index + 1;
      if (!obj.totalExpense) {
        obj.totalExpense = "0";
      }
      obj.full_name = obj.full_name.toUpperCase();
      return { rank, ...obj };
    });

    return res.status(200).json({ success: true, rankedData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error });
  }
};

module.exports = { showLeaderboard };
