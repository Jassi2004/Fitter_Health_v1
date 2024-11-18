import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ConversationResponse {
  conversationId: string;
}

export const startConversation = async (
  senderId: string,
  receiverId: string
): Promise<ConversationResponse> => {
  try {
    const token = localStorage.getItem('token'); 

    if (!token) {
      throw new Error('No token found in local storage');
    }

    const response = await axios.post<ConversationResponse>(`${API_BASE_URL}/api/conversations`, {
      senderId,
      receiverId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Failed to start conversation:', error);
    throw error;
  }
};
