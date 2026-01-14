const form = document.querySelector(".form");
const expenseList = document.querySelector(".transactions-list");
const currentPageEl = document.querySelector(".curr-page");
// const currentPage = Number(currentPageEl.textContent);
const limitEl = document.getElementById("limit");
const limit = Number(limitEl.value);
const prevPageBtn = document.querySelector(".prev-btn");
const nextPageBtn = document.querySelector(".next-btn");
const paginationSection = document.querySelector(".pages_container");

const getUserDetails = async function () {
  try {
    const result = await axios.get("http://localhost:8000/user/me", {
      withCredentials: true,
    });
    const welcomeMessageElement = document.querySelector(".welcome-message");
    const greeting = document.createElement("h1");
    greeting.textContent =
      `Welcome, ${result.data.user.fullName}`.toUpperCase();
    welcomeMessageElement.appendChild(greeting);
  } catch (error) {
    console.log(error.message);
  }
};

const getAllExpenses = async function (page, limit) {
  try {
    const result = await axios.get(
      `http://localhost:8000/expense/allExpenses?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error.message);
  }
};

const displayAllExpenses = async function () {
  expenseList.innerHTML = "";

  const pageVal = Number(sessionStorage.getItem("page")) || 1;
  const limitVal = Number(sessionStorage.getItem("limit")) || limit;
  limitEl.value = limitVal; //the value in select-option persists

  // console.log(pageVal, limitVal);

  const { result, hasNextPage } = await getAllExpenses(pageVal, limitVal);

  paginationSection.classList.remove("hidden");
  if (result.length === 0) {
    paginationSection.classList.add("hidden");
  }
  currentPageEl.textContent = pageVal;

  result.forEach((expense) => {
    const template = document.querySelector(".transaction-template");
    const expenseCard = template.content.cloneNode(true);
    const expenseCardEl = expenseCard.querySelector(".transaction");

    // adding values to the template
    expenseCardEl.querySelector(".transaction-description").textContent =
      expense.description;
    expenseCardEl.querySelector(".transaction-category").textContent =
      expense.category;
    const createdAt = new Date(expense.createdAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    expenseCardEl.querySelector(".transaction-date").textContent = createdAt;
    expenseCardEl.querySelector(
      ".transaction-amount"
    ).textContent = `₹ ${expense.expenseAmount}`;
    expenseCardEl.dataset.expenseId = expense.id;

    expenseList.appendChild(expenseCardEl);
  });

  if (pageVal === 1) {
    prevPageBtn.setAttribute("disabled", "true");
  } else {
    prevPageBtn.removeAttribute("disabled");
  }

  if (!hasNextPage) {
    nextPageBtn.setAttribute("disabled", "true");
  } else {
    nextPageBtn.removeAttribute("disabled");
  }
};

const showPrevPageExpenses = async function () {
  const currentPage = Number(currentPageEl.textContent);
  const limit = Number(limitEl.value);

  sessionStorage.setItem("page", currentPage - 1);
  sessionStorage.setItem("limit", limit);

  await displayAllExpenses();
};

const showNextPageExpenses = async function () {
  const currentPage = Number(currentPageEl.textContent);
  const limit = Number(limitEl.value);

  sessionStorage.setItem("page", String(currentPage + 1));
  sessionStorage.setItem("limit", String(limit));

  await displayAllExpenses();
};

// when the limit is changed, reset the page value in session storage
const showExpensesForUpdatedLimit = async function () {
  const page = 1;
  const limit = limitEl.value;

  sessionStorage.setItem("page", page);
  sessionStorage.setItem("limit", limit);

  await displayAllExpenses();
};

const submitExpenseForm = async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const expenseAmount = formData.get("expense-amount");
  const description = formData.get("description");
  const category = formData.get("category");

  const expenseObj = { expenseAmount, description, category };
  form.reset();

  await axios.post("http://localhost:8000/expense/addExpense", expenseObj, {
    withCredentials: true,
  });

  await displayAllExpenses();
};

const deleteExpense = async function (e) {
  const deleteBtn = e.target.closest(".delete-btn");
  if (!deleteBtn) return;
  const expenseEl = deleteBtn.closest(".transaction");
  const expenseId = expenseEl.dataset.expenseId;
  try {
    await axios.delete(
      `http://localhost:8000/expense/deleteExpense/${expenseId}`,
      {
        withCredentials: true,
      }
    );
    expenseEl.remove();

    const expensesCount = document.querySelectorAll(".transaction");
    if (expensesCount.length === 0) {
      const currentPage = Number(currentPageEl.textContent);
      sessionStorage.setItem("page", currentPage - 1);
    }

    await displayAllExpenses();
  } catch (error) {
    console.log(error);
  }
};

const init = async function () {
  await displayAllExpenses();
  await getUserDetails();
};

form.addEventListener("submit", submitExpenseForm);
expenseList.addEventListener("click", deleteExpense);
prevPageBtn.addEventListener("click", showPrevPageExpenses);
nextPageBtn.addEventListener("click", showNextPageExpenses);
limitEl.addEventListener("change", showExpensesForUpdatedLimit);

init();
