
const express = require('express');
const { searchUsers, followUser, unfollowUser, viewUserProfile } = require('../controllers/userController');
const router = express.Router();

// Search users
router.get('/search', searchUsers);

// Follow user
router.post('/follow', followUser);

// Unfollow user
router.post('/unfollow', unfollowUser);

// View user profile
router.get('/profile/:userId', viewUserProfile);

module.exports = router;
