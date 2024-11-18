'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchMessages, sendMessage, Message, fetchConversations, Conversation } from '@/services/message/messageService'; // API functions for messages
import { getUserProfile, UserProfile } from '@/services/user/getUserProfile'; // API function for fetching user profile

const ConversationPage = () => {
  const { conversationId, recipientId } = useParams();

  // Convert params to strings if they are arrays
  const conversationIdStr = Array.isArray(conversationId) ? conversationId[0] : conversationId;
  const recipientIdStr = Array.isArray(recipientId) ? recipientId[0] : recipientId;

  // States
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');

  // Fetch conversation and messages on load
  useEffect(() => {
    if (conversationIdStr) {
      // Fetch messages for the current conversation
      fetchMessages(conversationIdStr)
        .then((data) => {
          if (Array.isArray(data)) {
            setMessages(data);
          } else {
            console.error('Fetched messages data is not an array:', data);
          }
        })
        .catch((err) => console.error('Error fetching messages:', err));

      // Fetch conversation details
      fetchConversations()
        .then((conversations) => {
          const convo = conversations.find((convo) => convo._id === conversationIdStr);
          setConversation(convo || null);
        })
        .catch((err) => console.error('Error fetching conversation:', err));
    }

    // Fetch user profile based on recipientId
    if (recipientIdStr) {
      getUserProfile(recipientIdStr)
        .then((profile) => {
          setUserProfile(profile);
        })
        .catch((err) => console.error('Error fetching user profile:', err));
    }
  }, [conversationIdStr, recipientIdStr]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(conversationIdStr, newMessage, recipientIdStr)
        .then((message) => {
          setMessages((prevMessages) => [...prevMessages, message]); // Append new message
          setNewMessage(''); // Clear input
        })
        .catch((err) => console.error('Error sending message:', err));
    }
  };

  return (
    <div>
      <h1>Conversation</h1>

      {/* Display conversation details */}
      {conversation ? (
        <>
          <div>
            <h2>Participants</h2>
            <ul>
              {conversation.participants.map((participant) => (
                <li key={participant}>{participant}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Messages</h2>
            {messages.length === 0 && <p>No messages yet.</p>}
            <ul>
              {Array.isArray(messages) &&
                messages.map((message) => (
                  <li key={message.id} style={{ textAlign: message.isMine ? 'right' : 'left' }}>
                    <strong>{message.isMine ? 'You' : 'Recipient'}:</strong>
                    <p>{message.content}</p>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message"
            ></textarea>
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      ) : (
        <p>Loading conversation...</p>
      )}

      {/* Display user profile */}
      {userProfile ? (
        <div>
          <h3>Recipient's Profile</h3>
          <p><strong>Username:</strong> {userProfile.username}</p>
          <p><strong>ID:</strong> {userProfile._id}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ConversationPage;
