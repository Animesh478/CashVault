const form = document.querySelector(".login-form");

const loginUser = async function (e) {
  e.preventDefault();
  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");

  const userObj = { email, password };
  try {
    const response = await axios.post(
      "http://localhost:8000/user/login",
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

form.addEventListener("submit", loginUser);
