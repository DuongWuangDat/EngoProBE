const { expressjwt } = require("express-jwt");
const ApiError = require("../../utils/ApiError");
require("dotenv").config();
const authJWT = () => {
  const secret = process.env.SECRET_KEY;
  return expressjwt({
    secret: secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/ping"],
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
