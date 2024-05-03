const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

const getAllTours = (req, res) => {
  res.status(200).json({
    message: 'GET API endpoint',
  });
};
const getTour = (req, res) => {
  res.status(200).json({
    message: 'GET single record API endpoint',
  });
};
const createTour = (req, res) => {
  res.status(200).json({
    message: 'POST API endpoint',
  });
};
const updateTour = (req, res) => {
  res.status(200).json({
    message: 'PATCH API endpoint',
  });
};
const deleteTour = (req, res) => {
  res.status(200).json({
    message: 'DELETE API endpoint',
  });
};

const getAllUsers = (req, res) => {
  res.status(200).json({
    message: 'GET API endpoint',
  });
};
const getUser = (req, res) => {
  res.status(200).json({
    message: 'GET single record API endpoint',
  });
};
const createUser = (req, res) => {
  res.status(200).json({
    message: 'POST API endpoint',
  });
};
const updateUser = (req, res) => {
  res.status(200).json({
    message: 'PATCH API endpoint',
  });
};
const deleteUser = (req, res) => {
  res.status(200).json({
    message: 'DELETE API endpoint',
  });
};

const tourRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

const PORT = 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}...`));
