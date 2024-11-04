const User = require('../models/user');
const redis = require('../config/redisClient');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const CustomError = require('../utils/customError');
const {
    sendVerificationMail,
    sendWelcomeMail,
    sendResetPasswordMail,
    sendPasswordResetSuccessMail
}= require('../utils/sendingEmail');
const {generateTokenAndSetCookie} = require('../utils/generateTokenAndSetCookie');
const { log } = require('console');

// Generate OTP
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

// Store OTP in Redis with expiration
const storeOTP = async (email, otp, userData) => {
    try {
        const key = `verify:${email}`;
        const data = JSON.stringify({
            otp,
            userData
        });
        
        // Explicitly wait for Redis set operation
        const result = await redis.set(key, data, {
            EX: 600 // 10 minutes expiration
        });
        
        // Verify storage
        const storedData = await redis.get(key);
        if (!storedData) {
            throw new Error('Failed to verify Redis storage');
        }
        
        console.log('OTP stored successfully for:', email);
        console.log('Redis SET result:', result);
        return true;
    } catch (error) {
        console.error('Redis storage error:', error);
        throw new CustomError(500, `Failed to store verification data: ${error.message}`);
    }
};

// Verify Redis Connection
const checkRedisConnection = async () => {
    try {
        if (!redis.isReady) {
            await redis.connect();
        }
        const pingResult = await redis.ping();
        console.log('Redis ping result:', pingResult);
        return true;
    } catch (error) {
        console.error('Redis connection error:', error);
        throw new Error('Redis connection failed');
    }
};

// Sign up handler
// Sign up handler
const signup = async (req, res) => {
    try {
        // First, check Redis connection
        await checkRedisConnection();

        const { email, password, username, age, height, weight, gender, workoutLevel, name } = req.body; // Added 'name'

        // Validate required fields
        if (!email || !password || !username) { // Added 'name' to validation
            return res.status(400).json({
                status: 'error',
                message: 'Email, password, and name are required'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Email already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = generateOTP();
        console.log('Generated OTP:', otp); // For debugging

        // Prepare user data
        const userData = {
            email,
            password: hashedPassword,
            username,
            name, // Include name in user data
            age,
            height,
            weight,
            gender,
            workoutLevel
        };

        // Store in Redis and verify storage
        await storeOTP(email, otp, userData);

        // Send verification email
        await sendVerificationMail(email, otp);
       
        return res.status(200).json({
            status: 'success',
            message: 'Verification code sent to email',
        });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Failed to process signup request'
        });
    }
};


// Verify email handler
const verifyEmail = async (req, res) => {
    try {
        // First, check Redis connection
        await checkRedisConnection();

        const { email, verificationCode } = req.body;
        console.log("email: ",email, "verification code: ", verificationCode);
        if (!email || !verificationCode) {
            return res.status(400).json({
                status: 'error',
                message: 'Email and verification code are required'
            });
        }

        const key = `verify:${email}`;
        console.log('Checking verification for key:', key); // For debugging

        // Get stored data from Redis
        const storedData = await redis.get(key);
        console.log('Retrieved stored data:', storedData); // For debugging

        if (!storedData) {
            return res.status(400).json({
                status: 'error',
                message: 'Verification code has expired or is invalid'
            });
        }

        let parsedData;
        try {
            parsedData = JSON.parse(storedData);
        } catch (error) {
            console.error('JSON parse error:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Invalid verification data'
            });
        }

        const { otp, userData } = parsedData;
        const otpNumber = Number(otp);
        console.log("Otp stored in backend: ",otp);
        console.log(typeof otpNumber, typeof verificationCode);
        
        
        
        if (verificationCode !== otpNumber) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid verification code'
            });
        }

        // Create new user
        const newUser = await User.create(userData);

        // Delete verification data from Redis
        await redis.del(key);
        const token = generateTokenAndSetCookie(res, newUser._id);
        await sendWelcomeMail(newUser.email, newUser.username);
        return res.status(201).json({
            status: 'success',
            message: 'Email verified successfully',
            data: {
                user: newUser,
                token: token

            }
        });
    } catch (error) {
        console.error('Verification error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Failed to verify email'
        });
    }
};


const login = async (req, res) => {
    
    try {
       
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Email and password are required'
            });
        }

       
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            
            
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            console.log("password is not valid");
            
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Generate token and set cookie - pass only res and userId
        const token = await generateTokenAndSetCookie(res, user._id);

        // Update last login timestamp
        user.lastLogin = Date.now();
        await user.save();

        // Prepare user data for response (exclude sensitive fields)
        const userData = user.toObject();
        delete userData.password;
        await sendWelcomeMail(user.email, user.username);
        return res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token,
            data: {
                user: userData
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Failed to process login request'
        });
    }
};
const logout = async (req, res) => {
    try {
        // Clear the JWT cookie
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0), // Expire immediately
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.status(200).json({
            status: 'success',
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to process logout request'
        });
    }
};

// Forgot password handler
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                status: 'error',
                message: 'Email is required'
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User with this email does not exist'
            });
        }

        // Generate reset token and expiry
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + (60 * 60 * 1000); // 1 hour
        console.log("reset token in reset controller: " , resetToken);
        
        // Save reset token to user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();

        // Send reset password email
        const resetUrl = `${process.env.CLIENT_URL}/authentication/resetPassword/${resetToken}`;
        await sendResetPasswordMail(email, resetUrl);

        return res.status(200).json({
            status: 'success',
            message: 'Password reset instructions sent to email'
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to process password reset request'
        });
    }
};

// Reset password handler
const resetPassword = async (req, res) => {

    try {
        
        const { token } = req.query;
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({
                status: 'error',
                message: 'New password is required'
            });
        }

        // Find user with valid reset token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid or expired reset token'
            });
        }

        // Hash new password and update user
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        // Send success email
        await sendPasswordResetSuccessMail(user.email);
        console.log("password reset successful");
        
        return res.status(200).json({
            status: 'success',
            message: 'Password has been reset successfully'
        });
    } catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to reset password'
        });
    }
};




module.exports = { verifyEmail, signup, login, logout, forgotPassword, resetPassword };