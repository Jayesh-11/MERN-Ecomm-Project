const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.status || 500;
  err.message = err.message || "Internal server error";

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Invalid token`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpireError") {
    const message = `Token expired`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    // error: err.stack,
  });
};
