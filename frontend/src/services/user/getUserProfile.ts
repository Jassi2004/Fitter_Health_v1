import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users'; 

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
export const getUserProfile = async (userId: string) => {
    const response = await axios.get(`${API_BASE_URL}/profile/${userId}`, authHeader());
    return response.data;
  };