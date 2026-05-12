const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

console.log("inside config file");
console.log("dialect-", process.env.DB_DIALECT);

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
};
