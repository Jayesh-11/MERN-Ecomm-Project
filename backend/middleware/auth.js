const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token) {
    return next(new ErrorHander("Please Login to access products", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  await User.findById(decodedData._id);
});
