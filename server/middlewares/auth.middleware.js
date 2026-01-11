const { verifyJWT } = require("../services/userAuth.service");

const authenticateUserMiddleware = function (req, res, next) {
  const token = req.cookies.access_token;
  console.log("token-", token);
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }
  try {
    const userPayload = verifyJWT(token);
    console.log("user payload=", userPayload);
    req.user = userPayload;
    console.log("user: ", req.user);
  } catch (error) {
    console.log("Invalid Token:", err.message);
    // Clear the invalid cookie so the client stops sending bad data
    res.clearCookie("access_token");
    return res.status(403).json({ error: "Invalid or expired token" });
  }

  next();
};

module.exports = authenticateUserMiddleware;
