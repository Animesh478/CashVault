module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    orderId: {
      type: DataTypes.STRING,
      field: "order_id",
    },
    orderAmount: {
      type: DataTypes.INTEGER,
      field: "order_amount",
    },
    currency: {
      type: DataTypes.STRING,
    },
    paymentSessionId: {
      type: DataTypes.STRING,
      field: "payment_session_id",
    },
    status: {
      type: DataTypes.ENUM("SUCCESS", "FAILED", "PENDING"),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
  });
  return Order;
};
