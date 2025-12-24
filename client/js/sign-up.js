const form = document.querySelector(".form");

const submitForm = async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const phoneNumber = formData.get("phone-number");

  const userObj = { name, email, password, phoneNumber };

  try {
    const res = await axios.post(
      "http://localhost:8000/user-auth/signUp",
      userObj
    );
    if (res.data.redirectURL) {
      window.location.href = res.data.redirectURL;
    }
    console.log(res);
  } catch (error) {
    console.log(error);
  }

  form.reset();
  form.querySelector(":focus")?.blur(); //? removes the focus from the element that is focused upon
};

form.addEventListener("submit", submitForm);
