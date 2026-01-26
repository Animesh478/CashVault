const { verifyJWT } = require("../services/userAuth.service");
const logger = require("../utils/logger");

const authenticateUserMiddleware = function (req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    logger.warn("Authentication failed: No token provided", {
      ip: req.ip,
      route: req.originalUrl,
      method: req.method,
    });

    return res.status(401).json({ error: "Authentication required" });
  }
  try {
    const userPayload = verifyJWT(token);
    req.user = userPayload;

    next();
  } catch (error) {
    logger.warn("Authentication failed: Invalid or expired token", {
      ip: req.ip,
      route: req.originalUrl,
      error: error.message,
    });
    // Clear the invalid cookie so the client stops sending bad data
    res.clearCookie("access_token");
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticateUserMiddleware;
