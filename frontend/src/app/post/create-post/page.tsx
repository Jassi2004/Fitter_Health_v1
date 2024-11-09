"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/services/post/createPost';
import CreatePostTemplate from '@/components/post/create-post';

const CreatePostPage: React.FC = () => {
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]); // Changed to mediaFiles to be more general
  const [tags, setTags] = useState<string[]>([]);
  const [mentions, setMentions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        throw new Error('User not authenticated');
      }

      // Prepare FormData with userId as the author
      const formData = new FormData();
      formData.append('content', content);
      formData.append('author', userId); // Add userId as the author

      // Separate images and videos based on file type
      const images = mediaFiles.filter((file) => file.type.startsWith('image'));
      const videos = mediaFiles.filter((file) => file.type.startsWith('video'));

      // Append images and videos with specific field names
      images.forEach((file) => {
        formData.append('images', file); // Ensure the field name is "images"
      });
      videos.forEach((file) => {
        formData.append('videos', file); // Ensure the field name is "videos"
      });

      // Append tags and mentions
      tags.forEach((tag) => {
        formData.append('tags', tag);
      });
      mentions.forEach((mention) => {
        formData.append('mentions', mention);
      });

      // Call the service to create the post
      await createPost(formData);
      router.push(`/profile/${userId}`);
    } catch (error) {
      alert('There was an error creating your post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CreatePostTemplate
        content={content}
        mediaFiles={mediaFiles}
        tags={tags}
        mentions={mentions}
        setContent={setContent}
        setMediaFiles={setMediaFiles}
        setTags={setTags}
        setMentions={setMentions}
        handleSubmit={handleSubmit}
      />

      {loading && <div className="text-center mt-4">Creating your post...</div>}
    </div>
  );
};

export default CreatePostPage;
