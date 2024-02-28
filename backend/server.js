require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

// express app
const app = express();

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use(express.json());
app.use('/api/workouts', workoutRoutes);
//when a request is fired to /api/workouts, the router in backend/routes/workouts.js will handle it

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected & listening on port ' + process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });

