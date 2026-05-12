require("dotenv").config();

const { Sequelize } = require("sequelize");
console.log("inside db.js");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch((error) => {
    console.log("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
