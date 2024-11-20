
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
    }).select('username email followers image bio')

    const usersWithFollowStatus = users.map(user => ({
      ...user._doc,
      isFollowing: user.followers.includes(currentUserId)
    }));


    res.status(200).json(usersWithFollowStatus);
  } catch (error) {
    res.status(500).json({ message: 'Error searching users', error });
  }
};

const followUser = async (req, res) => {
  try {
    const { userId, followId } = req.body;

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { following: followId } },
      { new: true }
    );

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

    await User.findByIdAndUpdate(
      userId,
      { $pull: { following: unfollowId } },
      { new: true }
    );

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

const viewUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching user profile for userId:", userId);

    const user = await User.findById(userId)
      .select('-password')
      .populate('followers', 'username')
      .populate('following', 'username')
    // .populate('posts')
    // .populate('workoutHistory');

    if (!user) {
      console.error("User not found with userId:", userId);
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};



const updateProfileImage = async (req, res) => {
  const { userId } = req.params;
  const image = req.file ? req.file.path : null;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (image) {
      user.image = image;
      await user.save();
    }

    return res.json({
      message: 'Profile image updated successfully',
      image: user.image,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error updating profile image' });
  }
};

const updateProfileFields = async (req, res) => {
  const { userId } = req.params;
  const { bio, gender, dob } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (bio !== undefined) user.bio = bio;
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;

    await user.save();

    return res.json({
      message: 'Profile updated successfully',
      bio: user.bio,
      gender: user.gender,
      dob: user.dob,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error updating profile details' });
  }
};

const getAllFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .select('following')
      .populate('following', 'username email image bio'); // Adjust fields as needed

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.following);
  } catch (error) {
    console.error('Error fetching following list:', error.message);
    res.status(500).json({ message: 'Error fetching following list', error });
  }
};

const getAllFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .select('followers')
      .populate('followers', 'username email image bio'); // Adjust fields as needed

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.followers);
  } catch (error) {
    console.error('Error fetching followers list:', error.message);
    res.status(500).json({ message: 'Error fetching followers list', error });
  }
};




module.exports = {
  searchUsers,
  followUser,
  unfollowUser,
  viewUserProfile,
  updateProfileImage,
  updateProfileFields,
  getAllFollowers,
  getAllFollowing,
};

