const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a simple id",
      url: "profile pic url",
    },
  });

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHander("Please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHander("invalid User"), 401);
  }
  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid User"), 401);
  }
  sendToken(user, 200, res);
});
