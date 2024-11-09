import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createPost = async (formData: FormData) => {
  try {
    // Get userId and token from localStorage
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      throw new Error('User not authenticated');
    }

    // Prepare headers for authentication
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    const response = await axios.post(`${API_BASE_URL}/posts/create`, formData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Error creating post');
  }
};
