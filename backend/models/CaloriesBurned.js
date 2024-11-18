const mongoose = require('mongoose');

const CaloriesBurnedSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User schema
            required: true,
        },
        date: {
            type: Date,
            default: Date.now, // Tracks the date the calories were burned
            required: true,
        },
        calories: {
            type: Number,
            required: true, // Stores the number of calories burned
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('CaloriesBurned', CaloriesBurnedSchema);
