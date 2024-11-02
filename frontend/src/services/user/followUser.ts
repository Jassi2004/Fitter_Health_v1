import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users'; // Adjust the base URL as needed

// Send token with each request
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
export const followUser = async (userId: string, followId: string) => {
    const response = await axios.post(
      `${API_BASE_URL}/follow`,
      { userId, followId },
      authHeader()
    );
    return response.data;
  };