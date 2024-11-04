// controllers/userController.js
const User = require('../models/user');


const searchUsers = async (req, res) => {
  try {
    const query = req.query.q;
    const currentUserId = req.userId; 
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    }).select('username email followers') 

    const usersWithFollowStatus = users.map(user => ({
      ...user._doc,
      isFollowing: user.followers.includes(currentUserId) 
    }));
    console.log("hello from search for user function");
    

    res.status(200).json(usersWithFollowStatus);
  } catch (error) {
    res.status(500).json({ message: 'Error searching users', error });
  }
};

// controllers/userController.js
const followUser = async (req, res) => {
    try {
      const { userId, followId } = req.body;
  
      // Add followId to the user's following array if not already followed
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { following: followId } },
        { new: true }
      );
  
      // Add userId to the target user's followers array if not already following
      await User.findByIdAndUpdate(
        followId,
        { $addToSet: { followers: userId } },
        { new: true }
      );
  
      res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error following user', error });
    }
  };
  
  const unfollowUser = async (req, res) => {
    try {
      const { userId, unfollowId } = req.body;
  
      // Remove unfollowId from the user's following array
      await User.findByIdAndUpdate(
        userId,
        { $pull: { following: unfollowId } },
        { new: true }
      );
  
      // Remove userId from the target user's followers array
      await User.findByIdAndUpdate(
        unfollowId,
        { $pull: { followers: userId } },
        { new: true }
      );
  
      res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error unfollowing user', error });
    }
  };
  // controllers/userController.js
const viewUserProfile = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId)
        .select('-password') // Exclude password field for security
        .populate('followers', 'username')
        .populate('following', 'username')
        .populate('posts')
        .populate('workoutHistory');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user profile', error });
    }
  };
  

  module.exports = {
    searchUsers,
    followUser,
    unfollowUser,
    viewUserProfile,
  };
  
