const form = document.querySelector(".form");

const submitForm = async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const userObj = { name, email, password };
  console.log(userObj);

  try {
    await axios.post("http://localhost:8000/user/signUp", userObj);
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", submitForm);
