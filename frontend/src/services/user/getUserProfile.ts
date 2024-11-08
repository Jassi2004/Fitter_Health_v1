import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export interface UserProfile {
  _id: string;
  username: string;
  bio?: string;
  avatar?: string;
  followers: Array<string>;
  following: Array<string>;
  posts: Array<{
    _id: string;
    title: string;
    description?: string;
    imageUrl: string;
  }>;
}

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  try {
    const response: AxiosResponse<UserProfile> = await axios.get(`${API_BASE_URL}/profile/${userId}`, authHeader());
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching user profile:', error.response?.data || error.message);
    } else {
      console.error('Error fetching user profile:', error);
    }
    throw error;
  }
};
