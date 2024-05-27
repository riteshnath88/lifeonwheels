const catchAsync = require('../utils/catchAsync');
const Tour = require('../models/tourModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  // Get the tour data from the collection
  const tours = await Tour.find();
  // Build template
  // Render that template using tour data

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  // 2) Build the template

  // 3) Render the template using data from 1
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});
