const CaloriesBurned = require('../models/CaloriesBurned');
const User = require('../models/user');

// Add a calories entry
exports.addCaloriesEntry = async (req, res) => {
    const { userId, calories, date } = req.body;

    try {
        const newCaloriesEntry = new CaloriesBurned({ user: userId, calories, date });
        const savedEntry = await newCaloriesEntry.save();

        // Add reference to the user
        await User.findByIdAndUpdate(userId, {
            $push: { caloriesHistory: savedEntry._id },
        });

        res.status(201).json({ success: true, data: savedEntry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get calories for a specific user
exports.getUserCalories = async (req, res) => {
    const { userId } = req.params;

    try {
        const caloriesData = await CaloriesBurned.find({ user: userId }).sort({ date: -1 });
        res.status(200).json({ success: true, data: caloriesData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Fetch calories of followers
exports.getFollowersCalories = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('followers');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const followersCalories = await Promise.all(
            user.followers.map(async (follower) => {
                const calories = await CaloriesBurned.find({ user: follower._id }).sort({ date: -1 });
                return {
                    followerId: follower._id,
                    username: follower.username,
                    calories: calories.reduce((sum, entry) => sum + entry.calories, 0), // Sum calories
                };
            })
        );

        // Sort followers by total calories
        followersCalories.sort((a, b) => b.calories - a.calories);

        res.status(200).json({ success: true, data: followersCalories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete a calories entry
exports.deleteCaloriesEntry = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEntry = await CaloriesBurned.findByIdAndDelete(id);
        if (!deletedEntry) return res.status(404).json({ success: false, message: 'Entry not found' });

        // Remove reference from user
        await User.findByIdAndUpdate(deletedEntry.user, {
            $pull: { caloriesHistory: deletedEntry._id },
        });

        res.status(200).json({ success: true, message: 'Entry deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
