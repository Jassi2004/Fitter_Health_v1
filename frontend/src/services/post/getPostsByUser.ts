import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getPostsByUser = async (userId: string) => {
  try {
    const token = localStorage.getItem('token');  
    
    const response = await axios.get(`${API_BASE_URL}/posts/user/${userId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',  
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching posts for user:', error);
    throw error;
  }
};
