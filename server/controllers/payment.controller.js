const { v4: uuidv4 } = require("uuid");
const { createOrder } = require("../services/cashfree.service");

const { OrderModel } = require("../models/index");

const generateOrderId = function () {
  return `ORD_${Date.now()}_${uuidv4().slice(0, 8)}`;
};

const processPayment = async function (req, res) {
  const orderId = generateOrderId();
  const orderAmount = 2000;
  const orderCurrency = "INR";
  const customerId = "1";
  const customerPhone = "9999999999";

  try {
    const { data } = await createOrder({
      orderId,
      orderAmount,
      orderCurrency,
      customerId,
      customerPhone,
    });
    console.log(data);

    await OrderModel.create({
      orderId: data.order_id,
      currency: data.order_currency,
      userId: parseInt(data.customer_details.customer_id),
      paymentSessionId: data.payment_session_id,
      orderAmount: data.order_amount,
      status: data.order_status,
    });
    return res.status(200).json({ result: data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = processPayment;
