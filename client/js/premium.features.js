const leaderboardBtn = document.querySelector(".leaderboard_btn");
const overlay = document.getElementById("overlay");
const leaderboardModal = document.querySelector(".container_leaderboard");
const rankingList = document.querySelector(".ranking_list");

// ? open and close leaderboard modal
const showLeaderboard = async function () {
  const result = await axios.get("http://localhost:8000/premium/leaderboard", {
    withCredentials: true,
  });

  const currentUser = result.data.userId;
  const leaderboardData = result.data.rankedData;

  rankingList.innerHTML = "";
  leaderboardData.forEach((entry) => {
    const template = document.querySelector(".ranking_template");
    const rankCard = template.content.cloneNode(true);
    const rankCardEl = rankCard.querySelector(".rank_row");

    rankCardEl.querySelector(".user_rank").textContent = entry.rank;
    rankCardEl.querySelector(".user_name").textContent = entry.full_name;
    rankCardEl.querySelector(".user_total-expense").textContent =
      entry.totalExpenses;

    if (entry.id === currentUser) {
      rankCardEl.classList.add("highlight_current_user");
    }

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
