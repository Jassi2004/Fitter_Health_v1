// components/PostCard.tsx

import React from 'react';

interface Post {
  _id: string;
  author: string;
  content: string;
  images: string[];
  videos: string[];
  likes?: number;
  comments?: number;
}

interface PostCardProps {
  post: Post;
  username: string;
  API_BASE_URL: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, username, API_BASE_URL }) => {
  return (
    <div className="border border-gray-600 rounded-lg p-4 bg-gray-800 text-white">
      <div className="flex items-center mb-2">
        <h3 className="font-bold">{username}</h3>
      </div>
      
      <p className="text-gray-200 mb-3">{post.content}</p>
      
      {post.images.length > 0 && (
        <div className="mb-3">
          {post.images.map((image, index) => (
            <img
              key={index}
              src={`${API_BASE_URL}${image}`}
              alt={`Post image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
          ))}
        </div>
      )}
      
      {post.videos.length > 0 && (
        <div className="mb-3">
          {post.videos.map((video, index) => (
            <video key={index} controls className="w-full rounded-lg mb-2">
              <source src={`${API_BASE_URL}/uploads/${video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <p className="text-gray-400">{post.likes} Likes</p>
        <p className="text-gray-400">{post.comments} Comments</p>
      </div>
    </div>
  );
};

export default PostCard;
