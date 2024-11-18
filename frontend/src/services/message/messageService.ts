import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// Helper function to create headers with Authorization token
const getAuthToken = (): string | null => localStorage.getItem('token');

const getHeaders = () => {
  const token = getAuthToken();
  return {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }), // Conditionally add Authorization if token exists
    },
  };
};

// Types for messages, conversations, followers, and user profile
export type Message = {
  id: string;
  content: string;
  timestamp: number;
  isMine: boolean;
};

export type Conversation = {
  _id: string;
  participants: string[];
};

export interface Follower {
  _id: string;
  username: string;
}

export interface UserProfile {
  _id: string;
  username: string;
  bio?: string;
  image?: string;
  dob: string;
  gender: string;
  followers: Follower[];
  following: Follower[];
  posts: Array<{
    _id: string;
    title: string;
    description?: string;
    imageUrl: string;
  }>;
}

// Conversation and message functions
export const fetchConversations = async (): Promise<Conversation[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/conversations`, getHeaders());
  return response.data;
};

export const fetchMessages = async (conversationId: string): Promise<Message[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/messages/${conversationId}`, getHeaders());
  return response.data;
};

export const sendMessage = async (conversationId: string, content: string, recipientId: string): Promise<Message> => {
  if (!recipientId) {
    throw new Error('Recipient ID is required');
  }

  const response = await axios.post(
    `${API_BASE_URL}/api/messages/send`,
    { conversationId, content, recipientId },
    getHeaders()
  );
  return response.data;
};
