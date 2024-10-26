const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (res, userId) => {
    // Create the token with proper expiration
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }  // Set explicit expiration time
    );

    // Set the cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    });

    return token;
};

module.exports = { generateTokenAndSetCookie };