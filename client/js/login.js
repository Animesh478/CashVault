const form = document.querySelector(".login-form");
const forgotPasswordBtn = document.querySelector(".forgot_password");
const overlay = document.querySelector(".overlay");
const forgotPasswordSection = document.querySelector(
  ".forgot_password_section"
);
const resetPasswordBtn = document.querySelector(".reset_password_btn");
const forgotPasswordForm = document.querySelector(".forgot_password_form");

const loginUser = async function (e) {
  e.preventDefault();
  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");

  const userObj = { email, password };
  try {
    const response = await axios.post(
      "http://localhost:8000/user-auth/login",
      userObj,
      {
        withCredentials: true,
      }
    );
    if (response.data.redirectURL) {
      window.location.href = response.data.redirectURL;
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  form.reset();
  form.querySelector(":focus")?.blur(); //? removes the focus from the element that is focused upon
};

const showForgotPasswordForm = function () {
  overlay.classList.remove("hidden");
  forgotPasswordSection.classList.remove("hidden");
};
const hideForgotPasswordForm = function () {
  overlay.classList.add("hidden");
  forgotPasswordSection.classList.add("hidden");
};

const resetPasswordLink = async function (e) {
  e.preventDefault();
  const registeredEmail = forgotPasswordForm.querySelector(
    ".forgot_password_email"
  ).value;

  const dataObj = {
    email: registeredEmail,
  };

  try {
    const response = await axios.post(
      "http://localhost:8000/user-auth/forgot-password",
      dataObj
    );
    hideForgotPasswordForm();
    alert(`${response.data.message}`);
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", loginUser);
forgotPasswordBtn.addEventListener("click", showForgotPasswordForm);
overlay.addEventListener("click", hideForgotPasswordForm);
forgotPasswordForm.addEventListener("submit", resetPasswordLink);
