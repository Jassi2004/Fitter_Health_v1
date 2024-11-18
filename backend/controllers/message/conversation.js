
const Conversation = require('../../models/messages/conversation');
const User = require('../../models/user');

const getConversations = async (req, res) => {
  try {
    const userId = req.user._id; 
    const conversations = await Conversation.find({ participants: userId })
      .populate('participants', 'username email') 
      .populate('lastMessage') 
      .sort({ updatedAt: -1 }); 
    console.log(conversations);
      

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching conversations' });
  }
};

const startConversation = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const userId = req.user._id;

    if (userId.toString() === receiverId.toString()) {
      return res.status(400).json({ error: 'You cannot start a conversation with yourself' });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverId] },
    }).populate('participants', 'username email')
      .populate('lastMessage'); 

    if (!conversation) {

      conversation = new Conversation({
        participants: [userId, receiverId],
      });
      await conversation.save();
    }

    res.status(200).json({ conversationId: conversation._id });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Error starting conversation' });
  }
};


module.exports = {
  getConversations,
  startConversation,
};
