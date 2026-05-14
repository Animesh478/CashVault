import { API_BASE } from "/js/config.js";

const monthlyTable = document.querySelector(".monthly_table-body");
const monthlyExpenseFoot = document.querySelector(".monthly_table-foot");
const yearlyTableBody = document.querySelector(".yearly_table-body");
const yearlyTableFoot = document.querySelector(".yearly_table-foot");
const currentDateTimeEl = document.querySelector(".current_date_time");
const currentMonthEl = document.querySelector(".current_month");
const currentYearEl = document.querySelector(".current_year");
const generatePdfBtn = document.querySelector(".generate_pdf_btn");
const downloadAllBtn = document.querySelector(".generate_all_expenses");

const currentDate = new Date().toLocaleString("en-IN", {
  dateStyle: "full",
  timeStyle: "medium",
});

const currentMonth = new Date().toLocaleDateString("en-IN", {
  month: "long",
});

const currentYear = new Date().getFullYear();

currentDateTimeEl.textContent = currentDate;
currentMonthEl.textContent = `${currentMonth}, ${currentYear}`;
currentYearEl.textContent = currentYear;

const getUser = async function () {
  const result = await axios.get(`${API_BASE}user/me`, {
    withCredentials: true,
  });
  const isPremium = result.data.user.isPremium;
  if (isPremium) {
    downloadAllBtn.classList.remove("hidden");
  }
};

const calculateMonthly = function (groupedExpenses) {
  // todo - calculate monthly expense
  return Object.values(groupedExpenses).reduce((total, day) => {
    return total + day.dayTotal;
  }, 0);
};

const getLocaleDate = function (utcDate) {
  return new Date(utcDate).toLocaleDateString("en-IN");
};

const expensesGroupedByDate = function (expenses) {
  return expenses.reduce((acc, expense) => {
    const dateObj = new Date(expense.createdAt);
    const currentMonth = new Date().getMonth();

    if (currentMonth === dateObj.getMonth()) {
      const date = getLocaleDate(expense.createdAt);

      if (!acc[date]) {
        acc[date] = {
          items: [],
          dayTotal: 0,
        };
      }

      acc[date].items.push(expense);
      acc[date].dayTotal += expense.expenseAmount;
    }
    return acc;
  }, {});
};

// sort the expenses by date
const sortGroupedExpenses = function (groupedExpenses) {
  return Object.entries(groupedExpenses)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([date, data]) => ({ date, ...data }));
};

const renderExpenses = function (expense, dailyExpense) {
  const expenseRowTemplate = document.querySelector(".expense_row_template");
  const expenseRow = expenseRowTemplate.content.cloneNode(true);
  expenseRow.querySelector(".date").textContent = dailyExpense.date;
  expenseRow.querySelector(".desc").textContent = expense.description;
  expenseRow.querySelector(".category").textContent = expense.category;
  expenseRow.querySelector(".exp_amt").textContent =
    `₹ ${expense.expenseAmount}`;

  monthlyTable.appendChild(expenseRow);
};

const renderDailyTotal = function (dailyExpense) {
  const dailyTotalTemplate = document.querySelector(".daily_total_template");
  const dailyTotal = dailyTotalTemplate.content.cloneNode(true);
  dailyTotal.querySelector(".daily_total_amount").textContent =
    `₹ ${dailyExpense.dayTotal}`;

  monthlyTable.appendChild(dailyTotal);
};

const renderMonthlyTotal = function (groupedExpenses) {
  const monthlyTotalTemplate = document.querySelector(
    ".monthly_total_template",
  );
  const monthlyTotal = monthlyTotalTemplate.content.cloneNode(true);
  const monthlyTotalAmount = calculateMonthly(groupedExpenses);
  monthlyTotal.querySelector(".monthly_total_amount").textContent =
    `₹ ${monthlyTotalAmount}`;
  monthlyExpenseFoot.appendChild(monthlyTotal);
};

const groupExpensesByMonth = function (expenses) {
  return expenses.reduce((acc, expense) => {
    const month = new Date(expense.createdAt).toLocaleDateString("en-IN", {
      month: "long",
    });
    if (!acc[month]) {
      acc[month] = {
        totalMonthlyExpense: 0,
      };
    }
    acc[month].totalMonthlyExpense += expense.expenseAmount;
    return acc;
  }, {});
};

const renderMonthlyExpenses = function (entry) {
  const monthlyTemplate = document.querySelector(".monthly_expense_template");
  const monthlyTotal = monthlyTemplate.content.cloneNode(true);
  monthlyTotal.querySelector(".month").textContent = entry[0];
  monthlyTotal.querySelector(".month_total").textContent =
    `₹ ${entry[1].totalMonthlyExpense}`;
  yearlyTableBody.appendChild(monthlyTotal);
};

const renderYearlyTotal = function (yearlyTotal) {
  const yearlyTotalTemplate = document.querySelector(".yearly_total_template");
  const yearlyTotalEl = yearlyTotalTemplate.content.cloneNode(true);
  yearlyTotalEl.querySelector(".yearly_total").textContent = `₹ ${yearlyTotal}`;
  yearlyTableFoot.appendChild(yearlyTotalEl);
};

const getAllExpenses = async function () {
  try {
    const response = await axios.get(`${API_BASE}expense/generateReport`, {
      withCredentials: true,
    });
    const expenses = response.data.result;
    // refactor the data day wise
    const groupedData = expensesGroupedByDate(expenses);
    const sortedExpenses = sortGroupedExpenses(groupedData);

    sortedExpenses.forEach((dailyExpense) => {
      const expenses = dailyExpense.items;
      expenses.forEach((expense) => {
        renderExpenses(expense, dailyExpense);
      });
      renderDailyTotal(dailyExpense);
    });

    renderMonthlyTotal(groupedData);

    const groupedMonthlyExpenses = groupExpensesByMonth(expenses);

    let yearlyTotal = 0;
    Object.entries(groupedMonthlyExpenses).forEach((entry) => {
      renderMonthlyExpenses(entry);
      yearlyTotal += entry[1].totalMonthlyExpense;
    });
    renderYearlyTotal(yearlyTotal);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error);
    }
  }
};

const downloadAllExpenses = async function () {
  try {
    const response = await axios.get(`${API_BASE}expense/downloadAll`, {
      withCredentials: true,
    });
    const downloadUrl = response.data.downloadUrl;
    console.log(response);
    if (downloadUrl) {
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.setAttribute("target", "_blank");
      document.body.appendChild(downloadLink);

      downloadLink.click();
      downloadLink.remove();
    }
  } catch (error) {
    console.log(error);
  }
};

const downloadAsPdf = function () {
  window.print();
};

document.addEventListener("DOMContentLoaded", getAllExpenses);
generatePdfBtn.addEventListener("click", downloadAsPdf);
downloadAllBtn.addEventListener("click", downloadAllExpenses);
getUser();
