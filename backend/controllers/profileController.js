
const User = require('../models/user');


const getUserProfile = async (req, res) => {
    const userId = req.user.id; 

    try {
        const user = await User.findById(userId)
            .select('-password -resetPasswordToken -resetPasswordExpiresAt -verificationToken -verificationTokenExpiresAt') // Exclude sensitive fields
            // .populate('posts');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {getUserProfile}