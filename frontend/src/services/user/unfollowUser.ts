import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users'; 

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
export const unfollowUser = async (userId: string, unfollowId: string) => {
    const response = await axios.post(
      `${API_BASE_URL}/unfollow`,
      { userId, unfollowId },
      authHeader()
    );
    console.log("user unfollowed successfully");
    return response.data;
  };
  