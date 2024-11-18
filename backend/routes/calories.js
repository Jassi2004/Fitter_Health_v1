const express = require('express');
const {
    addCaloriesEntry,
    getUserCalories,
    getFollowersCalories,
    deleteCaloriesEntry,
} = require('../controllers/caloriesController');

const router = express.Router();

// Add a calories entry
router.post('/', addCaloriesEntry);

// Get calories for a specific user
router.get('/user/:userId', getUserCalories);

// Fetch calories of followers
router.get('/followers/:userId', getFollowersCalories);

// Delete a calories entry
router.delete('/:id', deleteCaloriesEntry);

module.exports = router;
