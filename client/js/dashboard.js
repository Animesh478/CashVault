const form = document.querySelector(".form");
const expenseList = document.querySelector(".transactions-list");

const getUserDetails = async function () {
  const result = await axios.get("http://localhost:8000/user/me", {
    withCredentials: true,
  });
  const welcomeMessageElement = document.querySelector(".welcome-message");
  const greeting = document.createElement("h1");
  greeting.textContent = `Welcome, ${result.data.user.fullName}`.toUpperCase();
  welcomeMessageElement.appendChild(greeting);
  console.log(result);
};

const getAllExpenses = async function () {
  const result = await axios.get("http://localhost:8000/expense/allExpenses", {
    withCredentials: true,
  });
  return result.data;
};

const displayAllExpenses = async function () {
  expenseList.innerHTML = "";
  const expenses = await getAllExpenses();
  console.log("expenses=", expenses);
  expenses.forEach((expense) => {
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
    expenseCardEl.querySelector(".transaction-amount").textContent =
      expense.expenseAmount;
    expenseCardEl.dataset.expenseId = expense.id;

    expenseList.appendChild(expenseCardEl);
  });
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
    await displayAllExpenses();
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", submitExpenseForm);

expenseList.addEventListener("click", deleteExpense);

const init = async function () {
  await displayAllExpenses();
  await getUserDetails();
};

init();
