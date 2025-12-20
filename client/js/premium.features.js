const leaderboardBtn = document.querySelector(".leaderboard_btn");
const overlay = document.getElementById("overlay");
const leaderboardModal = document.querySelector(".container_leaderboard");

// ? open and close leaderboard modal
const showLeaderboard = function () {
  console.log(overlay.classList);
  overlay.classList.remove("hidden");
  leaderboardModal.classList.remove("hidden");
};

const closeLeaderboard = function () {
  overlay.classList.add("hidden");
  leaderboardModal.classList.add("hidden");
};

leaderboardBtn.addEventListener("click", showLeaderboard);
overlay.addEventListener("click", closeLeaderboard);
