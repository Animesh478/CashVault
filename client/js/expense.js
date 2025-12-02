const form = document.querySelector(".form");
const expenseList = document.querySelector(".transactions-list");

const getAllExpenses = async function () {
  const result = await axios.get("http://localhost:8000/expense/allExpenses");
  return result.data;
};

const displayAllExpenses = async function () {
  expenseList.innerHTML = "";
  const expenses = await getAllExpenses();
  expenses.forEach((expense) => {
    const template = document.querySelector("template");
    const expenseCard = template.content.cloneNode(true);

    // adding values to the template
    expenseCard.querySelector(".transaction-description").textContent =
      expense.description;
    expenseCard.querySelector(".transaction-category").textContent =
      expense.category;
    const createdAt = new Date(expense.createdAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    expenseCard.querySelector(".transaction-date").textContent = createdAt;
    expenseCard.querySelector(".transaction-amount").textContent =
      expense.expenseAmount;

    expenseList.appendChild(expenseCard);
  });
};

const submitExpenseForm = async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const expenseAmount = formData.get("expense-amount");
  const description = formData.get("description");
  const category = formData.get("category");

  const expenseObj = { expenseAmount, description, category };

  await axios.post("http://localhost:8000/expense/addExpense", expenseObj);

  await displayAllExpenses();
};

const init = async function () {
  await displayAllExpenses();
  form.addEventListener("submit", submitExpenseForm);
};

init();
