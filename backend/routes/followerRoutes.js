const express = require('express');
const router = express.Router();
const { getFollowersLeaderboard } = require('../controllers/followerController');

router.get('/:userId/leaderboard', getFollowersLeaderboard);

module.exports = router;
