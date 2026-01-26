const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const userAuthRouter = require("./routes/userAuth.routes");
const expenseRouter = require("./routes/expense.routes");
const paymentRouter = require("./routes/payment.routes");
const premiumRouter = require("./routes/premium.routes");
const userRouter = require("./routes/user.routes");
const morganMiddleware = require("./middlewares/morgan.middleware");
const errorHandler = require("./middlewares/errorHandler");

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
app.use(morganMiddleware);

app.use("/user-auth", userAuthRouter);
app.use("/user", userRouter);
app.use("/expense", expenseRouter);
app.use("/payment", paymentRouter);
app.use("/premium", premiumRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server started");
});
