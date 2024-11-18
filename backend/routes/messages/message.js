const express = require('express');
const { getMessages, sendMessage } = require('../../controllers/message/message');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

// Get all messages in a conversation
router.get('/messages/:conversationId', authMiddleware, getMessages);

// Send a new message in a conversation
router.post('/messages/send', authMiddleware, sendMessage);

module.exports = router;
