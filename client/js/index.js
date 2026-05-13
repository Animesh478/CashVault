import { FRONTEND_BASE } from "./config.js";

const signUpBtn = document.querySelector(".cta-signUp");
const loginBtn = document.querySelector(".cta-login");

signUpBtn.addEventListener("click", () => {
  window.location.href = `${FRONTEND_BASE}pages/sign-up.html`;
});
loginBtn.addEventListener("click", () => {
  window.location.href = `${FRONTEND_BASE}pages/login.html`;
});
