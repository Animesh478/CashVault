const express = require("express");
const cors = require("cors");

const router = require("./routes/userAuth.routes");

const app = express();

app.use(cors());
app.use("/user", router);

app.listen(8000, () => {
  console.log("server started");
});
