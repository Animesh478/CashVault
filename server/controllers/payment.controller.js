const { v4: uuidv4 } = require("uuid");

const {
  createOrder,
  verifyPaymentStatus,
} = require("../services/cashfree.service");
const { OrderModel, UserModel } = require("../models/index");
const logger = require("../utils/logger");

const generateOrderId = function () {
  return `ORD_${Date.now()}_${uuidv4().slice(0, 8)}`;
};

const processPayment = async function (req, res, next) {
  const { id, email, phoneNumber } = req.user;
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

    // update Order table after the order is created
    await order.update({
      paymentSessionId: data.payment_session_id,
    });

    return res.status(200).json({ result: data });
  } catch (error) {
    logger.error("Unable to initiate payment", {
      userId: id,
      body: req.body,
      error: error.message,
      stack: error.stack,
    });

    error.statusCode = 500;
    next(error);
  }
};

const paymentStatus = async function (req, res, next) {
  const { order_id } = req.query;

  try {
    const payments = await verifyPaymentStatus(order_id);

    if (!payments || payments.length === 0) {
      logger.warn("No payment records found", {
        userId: user?.id,
        orderId: order_id,
      });

      return res.status(404).json({ message: "Payment not found" });
    }

    const order = await OrderModel.findOne({
      where: {
        orderId: order_id,
      },
    });

    if (!order) {
      logger.warn("Order does not exist", {
        userId: order?.userId,
        orderId: order_id,
      });
      return res.status(404).json({ message: "Order does not exist" });
    }

    const latestPayment = payments[0];

    if (latestPayment.payment_status === "SUCCESS") {
      await OrderModel.update(
        {
          status: "SUCCESS",
        },
        {
          where: {
            orderId: order_id,
          },
        },
      );
      await UserModel.update(
        {
          isPremium: "true",
        },
        {
          where: {
            id: order.userId,
          },
        },
      );
      return res.redirect(
        `${process.env.FRONTEND_URL}/client/pages/paymentStatus.html?status=${latestPayment.payment_status}&order_id=${order_id}`,
      );
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
        },
      );
      logger.warn("Payment failed", {
        userId: user?.id,
        orderId: order_id,
      });
    }

    // Pending payment status
    await OrderModel.update(
      {
        status: "PENDING",
      },
      {
        where: {
          orderId: order_id,
        },
      },
    );

    logger.info("Payment pending", {
      orderId: order_id,
      userId: order.userId,
    });

    return res.status(200).json({ message: "Payment pending" });
  } catch (error) {
    logger.error("Payment status pending", {
      userId: user?.id,
      body: req.body,
      error: error.message,
      stack: error.stack,
    });

    error.statusCode = 500;
    next(error);
  }
};

module.exports = {
  processPayment,
  paymentStatus,
};
