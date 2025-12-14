const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const { sequelize } = require("./models/index");
const userRouter = require("./routes/userAuth.routes");
const expenseRouter = require("./routes/expense.routes");
const paymentRouter = require("./routes/payment.routes");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/expense", expenseRouter);
app.use("/payment", paymentRouter);

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
