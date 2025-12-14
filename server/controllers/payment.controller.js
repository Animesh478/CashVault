const { v4: uuidv4 } = require("uuid");

const {
  createOrder,
  verifyPaymentStatus,
} = require("../services/cashfree.service");
const { OrderModel, UserModel } = require("../models/index");

const generateOrderId = function () {
  return `ORD_${Date.now()}_${uuidv4().slice(0, 8)}`;
};

const processPayment = async function (req, res) {
  console.log("user=", req.user);
  const { id, name, email, phoneNumber } = req.user;
  const orderId = generateOrderId();
  const orderAmount = 2000;
  const orderCurrency = "INR";
  const customerId = id.toString();
  const customerPhone = phoneNumber;
  const customerMail = email;

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
      customerMail,
    });
    console.log(data);

    // update Order table after the order is created
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

const paymentStatus = async function (req, res) {
  const { order_id } = req.query;

  try {
    const payments = await verifyPaymentStatus(order_id);

    if (!payments || payments.length === 0) {
      return res
        .status(400)
        .json({ message: "Payment pending. Please wait or retry" });
    }

    const order = await OrderModel.findOne({
      where: {
        orderId: order_id,
      },
    });

    if (!order) {
      return res.status(400).json({ error: "Order doesnot exist" });
    }

    const latestPayment = payments[0];
    console.log(latestPayment);
    if (latestPayment.payment_status === "SUCCESS") {
      await OrderModel.update(
        {
          status: "SUCCESS",
        },
        {
          where: {
            orderId: order_id,
          },
        }
      );
      await UserModel.update(
        {
          isPremium: "true",
        },
        {
          where: {
            id: order.userId,
          },
        }
      );
      return res.status(200).json({ message: "Payment successful" });
    }
    if (latestPayment.payment_status === "FAILED") {
      await OrderModel.update(
        {
          status: "FAILED",
        },
        {
          where: {
            orderId: order_id,
          },
        }
      );
      return res.status(400).json({ message: "Payment failed" });
    }
    await OrderModel.update(
      {
        status: "PENDING",
      },
      {
        where: {
          orderId: order_id,
        },
      }
    );
    return res.status(200).json({ message: "Payment pending" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

module.exports = {
  processPayment,
  paymentStatus,
};
