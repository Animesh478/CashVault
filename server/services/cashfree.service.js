const { Cashfree, CFEnvironment } = require("cashfree-pg");

// creating an instance of cashfree
const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  "TEST430329ae80e0f32e41a393d78b923034",
  "TESTaf195616268bd6202eeb3bf8dc458956e7192a85"
);

const createOrder = async function ({
  orderId,
  orderAmount,
  orderCurrency = "INR",
  customerId,
  customerPhone,
}) {
  const expiryTime = new Date(Date.now() + 60 * 60 * 1000);
  const formattedExpiryTime = expiryTime.toISOString();

  const order = {
    order_amount: orderAmount,
    order_currency: orderCurrency,
    order_id: orderId,
    customer_details: {
      customer_id: customerId,
      customer_phone: customerPhone,
    },
    order_meta: {
      return_url: "http://localhost:8000/payment/payment-status",
      payment_methods: "cc,dc,upi",
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
