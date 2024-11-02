const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust path as necessary

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Check cookie first, then header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user; // Attach user to request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
