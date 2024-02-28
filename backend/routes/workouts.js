const express = require('express');
const {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');
const Workout = require('../models/workoutModel');

const router = express.Router();

//GET all workouts
router.get('/', getAllWorkouts)

//GET a specific workout
router.get('/:id', getSingleWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a new workout
router.delete('/:id', deleteWorkout)

//UPDATE a new workout
router.patch('/:id', updateWorkout)



module.exports = router;