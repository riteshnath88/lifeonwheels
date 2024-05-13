const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});
exports.getUser = catchAsync(async (req, res) => {
  console.log(req.params.id);
  const currentUser = await User.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      currentUser,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(200).json({
    message: 'POST API endpoint',
  });
};
exports.updateUser = (req, res) => {
  res.status(200).json({
    message: 'PATCH API endpoint',
  });
};
exports.deleteUser = (req, res) => {
  res.status(200).json({
    message: 'DELETE API endpoint',
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if user POSTs passwrod data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updated. Please use /updateMyPassword',
        400
      )
    );
  }

  // Update user document - filter our unwanted fields
  const filteredBody = filteredObj(req.body, 'name', 'email');
  // Filter our unwanted fields like name, email which is not allowed:
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
