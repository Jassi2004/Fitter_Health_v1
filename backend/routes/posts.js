const express = require('express');
const { createPost, updatePost, deletePost, getPostsByUser, likePost, addComment } = require('../controllers/postController');
const upload = require('../services/multer'); 

const router = express.Router();

router.get('/user/:userId', getPostsByUser);
router.post('/create', upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 2 }]), createPost);


router.put('/update/:postId', upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 2 }]), updatePost);


router.delete('/delete/:postId', deletePost);
router.post('/:postId/like', likePost);


router.post('/:postId/comment', addComment);
module.exports = router;
