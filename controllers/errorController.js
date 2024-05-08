const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  let message = '';
  let value = '';
  if (!err.errmsg) {
    value = JSON.stringify(err.errorResponse.keyValue);
  } else {
    value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  }

  message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token.Please log in again!', 401);

const handleJWTExpireError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  let error = {};

  if (process.env.NODE_ENV == 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV == 'production') {
    if (err.name == 'CastError') {
      error = { ...err };
      error = handleCastErrorDB(error);
    }
    if (err.code == 11000) {
      error = { ...err };
      error = handleDuplicateFieldsDB(error);
    }
    if (err.name == 'ValidationError') {
      error = { ...err };
      error = handleValidationErrorDB(error);
    }
    if (err.name == 'JsonWebTokenError') {
      err = handleJWTError();
    }
    if (err.name == 'TokenExpiredError') {
      err = handleJWTExpireError();
    }
    sendErrorProd(err, res);
  }
};
