const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});
exports.getUser = (req, res) => {
  res.status(200).json({
    message: 'GET single record API endpoint',
  });
};
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
