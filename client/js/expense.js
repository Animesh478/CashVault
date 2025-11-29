const form = document.querySelector(".form");

const submitExpenseForm = async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const expenseAmount = formData.get("expense-amount");
  const description = formData.get("description");
  const category = formData.get("category");

  const expenseObj = { expenseAmount, description, category };

  const response = await axios.post(
    "http://localhost:8000/user/expense",
    expenseObj
  );
  console.log(response.data);
};

form.addEventListener("submit", submitExpenseForm);
