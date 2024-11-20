
const express = require('express');
const { searchUsers, followUser, unfollowUser, viewUserProfile, updateProfileImage, updateProfileFields, getAllFollowing,
  getAllFollowers } = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getUserCalories } = require('../controllers/caloriesController');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
// Search users
router.get('/search', searchUsers);

// Follow user
router.post('/follow', followUser);

// Unfollow user
router.post('/unfollow', unfollowUser);

// View user profile
router.get('/profile/:userId', viewUserProfile);

router.put('/:userId/update-profile-image', upload.single('image'), updateProfileImage);
router.put('/:userId/update-profile-fields', updateProfileFields);


router.get('/:userId/following', getAllFollowing);
router.get('/:userId/followers', getAllFollowers);




module.exports = router;
