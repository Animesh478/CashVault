const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// const transaction = await sequelize.transaction();

//? Load all the models
const UserModel = require("./user.model")(sequelize, DataTypes);
const ExpenseModel = require("./expense.model")(sequelize, DataTypes);
const OrderModel = require("./order.model")(sequelize, DataTypes);

UserModel.hasMany(ExpenseModel, {
  foreignKey: "userId",
});
ExpenseModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

UserModel.hasMany(OrderModel, {
  foreignKey: "userId",
});
OrderModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

module.exports = { sequelize, UserModel, ExpenseModel, OrderModel };
