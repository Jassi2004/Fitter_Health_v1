const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); 
const User = require('../models/user'); 

const router = express.Router();

// Route to get user profile
router.get('/getProfile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
