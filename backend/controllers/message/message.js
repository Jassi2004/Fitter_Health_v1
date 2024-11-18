
const Message = require('../../models/messages/message');
const Conversation = require('../../models/messages/conversation');


const mongoose = require('mongoose');

const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ error: 'Invalid conversation ID format' });
    }

    // Add pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const messages = await Message.find({ conversationId })
      .populate('sender', 'username email')
      .populate('recipient', 'username email')
      .sort({ timestamp: -1 }) // Changed to descending order for latest messages first
      .skip(skip)
      .limit(limit);

    const total = await Message.countDocuments({ conversationId });
    
    res.status(200).json({
      messages,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error in getMessages:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
};
// Send a new message in a conversation
const sendMessage = async (req, res) => {
  try {
    const { conversationId, content, recipientId } = req.body;
    const senderId = req.user._id; // Get the sender's ID from the authenticated user
    console.log(conversationId, content, recipientId, senderId)
    // Create a new message
    const newMessage = new Message({
      sender: senderId,
      recipient: recipientId,
      content,
      conversationId,
    });

    // Save the message to the database
    await newMessage.save();

    // Update the conversation with the latest message
    const conversation = await Conversation.findById(conversationId);
    conversation.lastMessage = newMessage._id;
    conversation.updatedAt = Date.now();
    await conversation.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
};

module.exports = {
  getMessages,
  sendMessage,
};
