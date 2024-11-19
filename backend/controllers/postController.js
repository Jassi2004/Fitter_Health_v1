
const Post = require('../models/posts');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');

const createPost = async (req, res) => {
    const { content, author } = req.body;
    // const user = User.findById(author);
    // console.log(user.username);
    
    // Store only the relative path
    const images = req.files['images'] ? req.files['images'].map(file => file.path.replace(/\\/g, '/').replace('uploads/', '')) : [];
    const videos = req.files['videos'] ? req.files['videos'].map(file => file.path.replace(/\\/g, '/').replace('uploads/', '')) : [];

  
    try {
      const newPost = new Post({
        author,
        content,
        images: images.map(img => `/uploads/${img}`),
        videos: videos.map(video => `/uploads/${video}`)
      });
  
      await newPost.save();
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      res.status(500).json({ message: 'Error creating post', error });
    }
  };
  
const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
  
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      post.content = content || post.content;
  
      // If new images or videos are uploaded, replace the existing ones
      if (req.files['images']) {
        post.images.forEach(filePath => fs.unlinkSync(path.join(__dirname, '..', filePath)));
        post.images = req.files['images'].map(file => file.path);
      }
      if (req.files['videos']) {
        post.videos.forEach(filePath => fs.unlinkSync(path.join(__dirname, '..', filePath)));
        post.videos = req.files['videos'].map(file => file.path);
      }
  
      await post.save();
      res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
      res.status(500).json({ message: 'Error updating post', error });
    }
  };
const deletePost = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Delete associated media files
      post.images.forEach(filePath => fs.unlinkSync(path.join(__dirname, '..', filePath)));
      post.videos.forEach(filePath => fs.unlinkSync(path.join(__dirname, '..', filePath)));
  
      await post.remove();
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting post', error });
    }
  };
  const getPostsByUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      console.log(userId);
      const posts = await Post.find({ author: userId });
        console.log(posts);
      if (!posts.length) {
        return res.status(500).json({ message: 'No posts found for this user.' });
      }
  
      return res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      return res.status(500).json({ message: 'Server error, please try again later.' });
    }
  };
  const likePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;
  
    try {
      const post = await Post.findById(postId);
  
      // Check if the username is already in the likes array
      if (post.likes.includes(userId)) {
        return res.status(400).json({ message: "Already liked!" });
      }
  
      // Add the username to the likes array
      post.likes.push(userId);
      await post.save();
  
      return res.status(200).json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error liking post" });
    }
  };
  
// Add a comment to a post
const addComment = async (req, res) => {
    const { postId } = req.params;
    const { username, comment } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Add the new comment to the post
        post.comments.push({ username, comment });
        await post.save();
        return res.status(200).json({ comments: post.comments });
    } catch (error) {
        console.error('Error adding comment:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports={createPost, updatePost, deletePost, getPostsByUser,  likePost,
  addComment};