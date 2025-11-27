const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

//? Load all the models
const UserModel = require("./user.model")(sequelize, DataTypes);

//todo: Define associations

module.exports = { sequelize, UserModel };
