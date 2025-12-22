const leaderboardBtn = document.querySelector(".leaderboard_btn");
const overlay = document.getElementById("overlay");
const leaderboardModal = document.querySelector(".container_leaderboard");
const rankingList = document.querySelector(".ranking_list");

// ? open and close leaderboard modal
const showLeaderboard = async function () {
  const result = await axios.get("http://localhost:8000/premium/leaderboard", {
    withCredentials: true,
  });
  const leaderboardData = result.data.rankedData;

  rankingList.innerHTML = "";
  leaderboardData.forEach((entry) => {
    const template = document.querySelector(".ranking_template");
    const rankCard = template.content.cloneNode(true);

    rankCard.querySelector(".user_rank").textContent = entry.rank;
    rankCard.querySelector(".user_name").textContent = entry.full_name;
    rankCard.querySelector(".user_total-expense").textContent =
      entry.totalExpense;

    rankingList.appendChild(rankCard);
  });

  console.log(result);

  overlay.classList.remove("hidden");
  leaderboardModal.classList.remove("hidden");
};

const closeLeaderboard = function () {
  overlay.classList.add("hidden");
  leaderboardModal.classList.add("hidden");
};

leaderboardBtn.addEventListener("click", showLeaderboard);
overlay.addEventListener("click", closeLeaderboard);
