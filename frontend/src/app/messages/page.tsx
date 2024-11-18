"use client"
import React, { useEffect, useState } from 'react';
import { fetchConversations, fetchMessages, sendMessage, Message, Conversation } from '@/services/message/messageService';

const MessagesPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null); // Use Conversation instead of string
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipientId, setRecipientId] = useState<string | null>(null); // Store the recipientId
  const loggedInUserId = 'user-id'; // Replace this with the actual logged-in user ID

  
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const data = await fetchConversations();
        setConversations(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };
    loadConversations();
  }, []);

  // Open a conversation and fetch messages, also set recipientId
  const openConversation = async (conversationId: string) => {
    const selectedConv = conversations.find((conv) => conv._id === conversationId);
    setSelectedConversation(selectedConv || null);
    if (selectedConv) {
      try {
        const data = await fetchMessages(conversationId); // Fetch messages for the selected conversation
        setMessages(data); // Assuming data is an array of messages
        // Find recipientId from the participants list, assuming the logged-in user is excluded
        const recipient = selectedConv.participants.find((participant) => participant !== loggedInUserId);
        if (recipient) {
          setRecipientId(recipient);  // Store the recipient ID for use in sending messages
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  // Send a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !recipientId) return;
    try {
      const message = await sendMessage(selectedConversation._id, newMessage, recipientId); // Pass conversationId and recipientId
      setMessages((prev) => [...prev, message]); // Update messages with the new message
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      {/* Conversations List */}
      <div className="w-1/3 pr-4 border-r border-gray-300">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Conversations</h3>
        <div className="space-y-2">
          {conversations.map((conv) => (
            <button
              key={conv._id}
              onClick={() => openConversation(conv._id)}
              className="w-full text-left p-3 bg-white shadow-sm hover:bg-blue-50 rounded-md focus:outline-none focus:bg-blue-100"
            >
              {conv.participants.join(', ')}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Section */}
      <div className="flex flex-col w-2/3 pl-4">
        {selectedConversation ? (
          <>
            <h4 className="text-xl font-semibold text-blue-600 mb-4">Messages</h4>
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-4 bg-white rounded-md shadow-inner">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-md ${
                    msg.isMine ? 'bg-blue-100 text-right self-end' : 'bg-gray-200 text-left'
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Select a conversation to view messages</p>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
