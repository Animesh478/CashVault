const { v4: uuidv4 } = require("uuid");

const { createOrder } = require("../services/cashfree.service");
const { OrderModel } = require("../models/index");

const generateOrderId = function () {
  return `ORD_${Date.now()}_${uuidv4().slice(0, 8)}`;
};

const processPayment = async function (req, res) {
  console.log("user=", req.user);
  const { id, name, email } = req.user;
  const orderId = generateOrderId();
  const orderAmount = 2000;
  const orderCurrency = "INR";
  const customerId = id.toString();
  const customerPhone = "9999999999";

  try {
    const order = await OrderModel.create({
      orderId,
      currency: orderCurrency,
      userId: id,
      orderAmount,
    });

    const { data } = await createOrder({
      orderId,
      orderAmount,
      orderCurrency,
      customerId,
      customerPhone,
    });
    console.log(data);

    // update Order table
    await order.update({
      paymentSessionId: data.payment_session_id,
    });

    return res.status(200).json({ result: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to initiate payment",
    });
  }
};

module.exports = processPayment;
