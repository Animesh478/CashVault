const { Cashfree, CFEnvironment } = require("cashfree-pg");

// creating an instance of cashfree
const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID,
  process.env.CASHFREE_SECRET_KEY
);

const createOrder = async function ({
  orderId,
  orderAmount,
  orderCurrency = "INR",
  customerId,
  customerPhone,
  customerMail,
}) {
  const expiryTime = new Date(Date.now() + 60 * 60 * 1000);
  const formattedExpiryTime = expiryTime.toISOString();

  const order = {
    order_amount: orderAmount,
    order_currency: orderCurrency,
    order_id: orderId,
    customer_details: {
      customer_id: customerId,
      customer_email: customerMail,
      customer_phone: customerPhone,
    },
    order_meta: {
      return_url: `http://localhost:8000/payment/payment-status?order_id=${orderId}`,
      payment_methods: "cc,dc,upi,nb",
    },
    order_expiry_time: formattedExpiryTime,
  };

  try {
    const response = await cashfree.PGCreateOrder(order);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createOrder,
};
