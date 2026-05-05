const signUpBtn = document.querySelector(".cta-signUp");
const loginBtn = document.querySelector(".cta-login");

signUpBtn.addEventListener("click", () => {
  window.location.href = "http://localhost:5500/client/pages/sign-up.html";
});
loginBtn.addEventListener("click", () => {
  window.location.href = "http://localhost:5500/client/pages/login.html";
});
