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

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      // origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
      origin: ["http://localhost:5500"],
      credentials: true,
    }),
  );
  console.log("CORS enabled for local development.");
} else {
  // In production, Nginx handles everything on the same origin.
  // No CORS needed!
  console.log("Running in production mode: CORS disabled.");
}

app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);

app.use("/api/user-auth", userAuthRouter);
app.use("/api/user", userRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/premium", premiumRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server started");
});
