const express = require('express');
const { getConversations, startConversation } = require('../../controllers/message/conversation');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

// Get all conversations for the authenticated user
router.get('/conversations',authMiddleware,  getConversations);

// Start a new conversation between two users
router.post('/conversations',authMiddleware, startConversation);

module.exports = router;
