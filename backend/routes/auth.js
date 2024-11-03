const express = require('express');
const router = express.Router();
const { verifyEmail, signup, login, logout, forgotPassword, resetPassword } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/verifyOtp', verifyEmail);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);

module.exports = router;

