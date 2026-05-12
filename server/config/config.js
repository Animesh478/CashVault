const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

console.log("inside config file");
console.log("dialect-", process.env.DB_DIALECT.trim());

module.exports = {
  development: {
    username: process.env.DB_USERNAME.trim(),
    password: process.env.DB_PASSWORD.trim(),
    database: process.env.DB_NAME.trim(),
    host: process.env.DB_HOST.trim(),
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME.trim(),
    password: process.env.DB_PASSWORD.trim(),
    database: process.env.DB_NAME.trim(),
    host: process.env.DB_HOST.trim(),
    dialect: "mysql",
  },
};
