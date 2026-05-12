const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

console.log("CONFIG LOADED BY SEQUELIZE-CLI");
console.log({
  NODE_ENV: process.env.NODE_ENV,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
});

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
