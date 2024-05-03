const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    message: 'GET API endpoint',
  });
};
exports.getTour = (req, res) => {
  res.status(200).json({
    message: 'GET single record API endpoint',
  });
};
exports.createTour = (req, res) => {
  res.status(200).json({
    message: 'POST API endpoint',
  });
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    message: 'PATCH API endpoint',
  });
};
exports.deleteTour = (req, res) => {
  res.status(200).json({
    message: 'DELETE API endpoint',
  });
};
