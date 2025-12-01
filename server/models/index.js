const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

//? Load all the models
const UserModel = require("./user.model")(sequelize, DataTypes);
const ExpenseModel = require("./expense.model")(sequelize, DataTypes);

//todo: Define associations
UserModel.hasMany(ExpenseModel);
ExpenseModel.belongsTo(UserModel);

module.exports = { sequelize, UserModel, ExpenseModel };
