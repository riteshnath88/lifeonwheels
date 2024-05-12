const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require('../../models/tourModel');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`));

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});

const deleteTour = async function deleteTours() {
  try {
    await Tour.deleteMany();
    console.log('Tours deleted successfully!');
  } catch (err) {
    console.log(err);
  }
};

const insertTour = async function insertTours() {
  try {
    await Tour.create(tours);
    console.log('Tours inserted successfully!');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == '--import') {
  insertTour();
}
if (process.argv[2] == '--delete') {
  deleteTour();
}
