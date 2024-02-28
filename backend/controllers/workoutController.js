const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find().sort({createdAt: -1});
        res.status(200).json(workouts);
        //what does status 200 mean? 
    } catch(error)
    {
        res.status(400).json({mssg: 'error getting workouts'});
        console.log(error);
    }
}

// get a single workout
const getSingleWorkout = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: 'invalid id'});
    }

    const workout = await Workout.findById(id);

    if(!workout)
    {
        return res.status(404).json({mssg: 'workout not found'});
    }

    res.status(200).json(workout);
}

// create a new workout
const createWorkout = async (req, res) => {
    const {title, reps, sets} = req.body;

    // add doc to db
    try {
        const workout = await Workout.create({title, reps, sets});
        res.status(200).json(workout);
    } catch(error)
    {
        res.status(400).json({mssg: 'error creating workout'});
        console.log(error);
    }
}
// delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: 'invalid id'});
    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if(!workout)
    {
        return res.status(404).json({mssg: 'workout not found'});
    }

    res.status(200).json({mssg: 'workout deleted'});
}

// update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: 'invalid id'});
    }   

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body //spread operator
    });

    if(!workout)
    {
        return res.status(404).json({mssg: 'workout not found'});
    }

    res.status(200).json({mssg: 'workout updated'});
}

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}