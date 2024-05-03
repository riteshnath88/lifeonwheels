exports.getAllUsers = (req, res) => {
  res.status(200).json({
    message: 'GET API endpoint',
  });
};
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
