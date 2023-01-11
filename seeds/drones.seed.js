const mongoose = require ("mongoose");
const Drone = require ("../models/Drone.model");
const MONGODB_URI = 'mongodb://localhost:27017/lab-express-drones';
mongoose.set('strictQuery', true);
const drones = require('../data/drones');

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Drone.deleteMany();
  })
  .then(() => {
    return Drone.create(drones);
  })
  .then(createdDrones => console.log(createdDrones))
  .then(() => {
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
