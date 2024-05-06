const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down.....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => console.log('DB Connection successful'))
  .catch((err) => console.log('ERROR'));

const PORT = 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}...`));

process.on('unhandledRejection', (err) => {
  console.log('UNHANDELED REJECTION! Shutting down.....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
