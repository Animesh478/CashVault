import { FRONTEND_BASE } from "/js/config.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const messageElement = document.querySelector(".message");
const homePageBtn = document.querySelector(".homepage-btn");

const status = urlParams.get("status");
const orderId = urlParams.get("order_id");

const message =
  status === "SUCCESS"
    ? `Payment was successful. Your order id is ${orderId} `
    : `Payment failed`;

messageElement.textContent = message;

const redirectHomepage = function () {
  window.location.replace(`${FRONTEND_BASE}pages/login.html`);
};

homePageBtn.addEventListener("click", redirectHomepage);
