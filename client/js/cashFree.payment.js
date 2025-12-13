const buyPremiumBtn = document.querySelector(".premium-btn");
const cashfree = window.Cashfree({
  mode: "sandbox",
});

// calling the create-order api when user clicks the premium button
const buyPremium = async function () {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/payment/create-order",
      {
        withCredentials: true,
      }
    );
    console.log(data);
    const paymentSessionId = data.result.payment_session_id;
    console.log(paymentSessionId);
    let checkoutOptions = {
      paymentSessionId,
      redirectTarget: "_self",
    };
    // cashfree.checkout(checkoutOptions);
  } catch (error) {
    console.log(error);
  }
};

buyPremiumBtn.addEventListener("click", buyPremium);
