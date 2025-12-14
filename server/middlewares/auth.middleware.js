const { verifyJWT } = require("../services/userAuth.service");

const authenticateUserMiddleware = function (req, res, next) {
  const token = req.cookies.access_token;
  // console.log("token-", token);
  if (token) {
    // now we have to verify the token
    const userPayload = verifyJWT(token);
    console.log("user payload=", userPayload);
    req.user = userPayload;
    // console.log("user: ", req.user);
  }
  next();
};

module.exports = authenticateUserMiddleware;
