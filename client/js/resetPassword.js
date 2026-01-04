const resetPasswordForm = document.querySelector(".reset_password");
const confirmPasswordEl = document.querySelector(".confirm_new_password");
const newPasswordEl = resetPasswordForm.querySelector(".new_password");

// check to see if both password and confirm password are same
confirmPasswordEl.addEventListener("keyup", () => {
  const confirmNewPassword = resetPasswordForm.querySelector(
    ".confirm_new_password"
  ).value;
  const newPassword = newPasswordEl.value;
  const errorMsgEl = document.querySelector(".error_message");

  if (confirmNewPassword !== newPassword) {
    errorMsgEl.classList.remove("hidden");
  } else {
    errorMsgEl.classList.add("hidden");
  }
});

// this runs as soon as the reset password link is clicked
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  //todo: if there is no id throw error

  try {
    const result = await axios.get(
      `http://localhost:8000/user-auth/resetPassword/${id}`
    );
    console.log("result-", result);
    // if the link is active show the form to reset the password
    const isActive = result.data.result.isActive;
    if (isActive) {
      resetPasswordForm.classList.remove("hidden");
    }
  } catch (error) {
    console.log("error=", error.response.data.message);
  }
});

resetPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const newPassword = newPasswordEl.value;

  const dataObj = {
    urlId: id,
    newPassword,
  };
  try {
    const response = await axios.post(
      `http://localhost:8000/user-auth/change-password`,
      dataObj
    );
    if (response.data.redirectURL) {
      window.location.href = response.data.redirectURL;
    }
  } catch (error) {
    console.log(error);
  }
});
