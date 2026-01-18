const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const { sequelize } = require("./models/index");
const userAuthRouter = require("./routes/userAuth.routes");
const expenseRouter = require("./routes/expense.routes");
const paymentRouter = require("./routes/payment.routes");
const premiumRouter = require("./routes/premium.routes");
const userRouter = require("./routes/user.routes");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    // origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    origin: ["http://localhost:5500"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/demo", (req, res) => {
  res.send("hello");
});

app.use("/user-auth", userAuthRouter);
app.use("/user", userRouter);
app.use("/expense", expenseRouter);
app.use("/payment", paymentRouter);
app.use("/premium", premiumRouter);

app.listen(PORT, () => {
  console.log("Server started");
});
