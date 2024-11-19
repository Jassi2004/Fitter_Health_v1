import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface LikePostRequest {
  username: string;
}

interface AddCommentRequest {
  username: string;
  comment: string;
}

interface PostResponse {
  _id: string;
  title: string;
  content: string;
  likes: number;
  comments: Array<{
    username: string;
    comment: string;
  }>;
}



export const likePost = async (postId: string, username: string|null): Promise<PostResponse> => {
  try {
    const response = await axios.post<PostResponse>(`${API_BASE_URL}/posts/${postId}/like`, {
      username,
    });
    return response.data; 
  } catch (error: any) {
    console.error('Error liking the post:', error?.response?.data || error);
    throw new Error('Failed to like the post. Please try again later.');
  }
};

export const addComment = async (
  postId: string,
  username: string,
  comment: string
): Promise<PostResponse> => {
  try {
    const response = await axios.post<PostResponse>(`${API_BASE_URL}/posts/${postId}/comment`, {
      username,
      comment,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error adding comment:', error?.response?.data || error);
    throw new Error('Failed to add your comment. Please try again later.');
  }
};
