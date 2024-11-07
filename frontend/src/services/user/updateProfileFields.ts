import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const updateProfile = async (
  userId: string,
  bio: string,
  gender: string,
  dob: string
) => {
  try {
    
    const response = await axios.put(
      `${API_BASE_URL}/api/users/${userId}/update-profile-fields`,
      {
        bio,
        gender,
        dob,
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to update profile');
    }

    return response.data; 
  } catch (error) {
    console.error('Error updating profile:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'An unknown error occurred');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
