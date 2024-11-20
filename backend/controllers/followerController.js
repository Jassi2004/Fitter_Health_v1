const CaloriesBurned = require('../models/CaloriesBurned');
const User = require('../models/user');

// Fetch leaderboard of followers based on calories
exports.getFollowersLeaderboard = async (req, res) => {

    console.log("hello");

    const { userId } = req.params;

    try {
        // Find the user and populate followers
        const user = await User.findById(userId).populate('followers', 'username image');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Fetch calories data for each follower
        const leaderboard = await Promise.all(
            user.followers.map(async (follower) => {
                const caloriesEntries = await CaloriesBurned.find({ user: follower._id });

                // Calculate total calories burned
                const totalCalories = caloriesEntries.reduce((sum, entry) => sum + entry.calories, 0);

                return {
                    followerId: follower._id,
                    username: follower.username,
                    image: follower.image, // Include profile image if available
                    totalCalories,
                };
            })
        );

        // Sort leaderboard by total calories burned in descending order
        leaderboard.sort((a, b) => b.totalCalories - a.totalCalories);

        res.status(200).json({
            success: true,
            leaderboard,
        });
    } catch (error) {
        console.error('Error generating leaderboard:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
