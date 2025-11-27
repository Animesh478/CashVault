const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./models/index");
const router = require("./routes/userAuth.routes");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use("/user", router);

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database Synced");
      console.log("Server started");
    });
  })
  .catch((error) => {
    console.log("DB sync error: ", error);
  });
