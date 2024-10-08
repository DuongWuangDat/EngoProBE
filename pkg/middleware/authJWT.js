const { expressjwt } = require("express-jwt");
const ApiError = require("../../utils/ApiError");
require("dotenv").config();
const authJWT = () => {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
  return expressjwt({
    secret: secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/ping", new RegExp(`^${process.env.API_URI}\/auth\/.*$`)],
  });
};

const handleJWTError = (err, req, res, next) => {
  if (err.name == "UnauthorizedError") {
    next(new ApiError(403, "Unauthorized"));
  } else {
    next();
  }
};

module.exports = { authJWT, handleJWTError };
