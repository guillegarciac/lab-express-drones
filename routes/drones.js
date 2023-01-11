const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model');

/* GET all drones */
router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const drones = await Drone.find({});
    res.render("drones/list", { drones });
  } catch (error) {
    next(error);
  }
});

/* GET form view */
/* ROUTE /drones/create */
router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    res.render("drones/create-form");
  } catch (error) {
    next(error)
  }
});

/* POST get drone inputs */
/* ROUTE /drones/create */
router.post('/drones/create', async function (req, res, next) {
  // Iteration #3: Add a new drone
  const {name, propellers, maxSpeed} = req.body;
  try {
    await Drone.create({ name, propellers, maxSpeed });
    res.redirect("/drones");
  } catch (error) {
    next(error)
  }
});

/* GET update view */
/* ROUTE /drones/:id/edit */

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  try {
    const droneId = await Drone.findById(id);
    res.render("drones/update-form", { droneId });
  } catch (error) {
    next(error)
  }
});

/* POST update drone inputs */
/* ROUTE /drones/:id/edit */

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;
  try {
    await Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed });
    res.redirect(`/drones`);
  } catch (error) {
    next(error)
  }
});

/* GET delete drone */
/* ROUTE /drones/:id/delete */
router.get('/drones/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params;
  try {
    await Drone.findByIdAndDelete(id);
    res.redirect(`/drones`);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
