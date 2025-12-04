const { verifyJWT } = require("../services/userAuth.services");

const authenticateUserMiddleware = function (req, res, next) {
  const token = req.cookies.access_token;
  if (token) {
    // now we have to verify the token
    const userPayload = verifyJWT(token);
    req.user = userPayload;
    console.log("user: ", req.user);
  }
  next();
};

module.exports = {
  authenticateUserMiddleware,
};
