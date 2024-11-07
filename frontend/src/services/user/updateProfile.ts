
import axios from 'axios';
import { UserProfile } from './getUserProfile';
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const updateProfile = async (userId: string, updatedData: Partial<UserProfile>) => {
    console.log(baseURL);
    
  const response = await axios.put(`${baseURL}/users/${userId}`, updatedData);
  return response.data;
};
