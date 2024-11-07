import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const updateImageService = async (userId: string | null, image: File | null) => {
  if (!image) {
    throw new Error('No image selected');
  }

  const formData = new FormData();
  formData.append('userId', userId as string);

  if (image) {
    formData.append('image', image);
  }

  try {
    
    const response = await axios.put(
      `${API_BASE_URL}/api/users/${userId}/update-profile-image`, 
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating image:', error);
    throw new Error('Error updating image');
  }
};
