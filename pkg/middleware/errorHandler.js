const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    const msg = httpStatus[statusCode];
    error = new ApiError(statusCode, msg);
  }

  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode;
  const message = err.message;
  if (!err.isOperational) {
    statusCode = httpStatus.BAD_REQUEST;
    message = httpStatus[statusCode];
  }

  res.locals.message = message;

  res.status(statusCode).json({
    message,
    statusCode,
  });
};

module.exports = { errorHandler, errorConverter };
