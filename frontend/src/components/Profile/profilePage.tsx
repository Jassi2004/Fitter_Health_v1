// ProfileTemplate.tsx
"use client";

import React from 'react';
import { UserProfile } from '@/services/user/getUserProfile';
import { GlowingStarsBackgroundCard } from '@/components/ui/glowing-stars';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';

interface Post {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
}

interface ProfileTemplateProps {
  user: UserProfile | null; 
  loading: boolean;
}

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ user, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <h2 className="text-white">User not found.</h2>;
  }

  return (
    <div className="relative w-full min-h-screen  overflow-hidden">
      {/* Background stars spanning the entire page */}
      

      {/* Profile Banner */}
      <div className="relative flex flex-col items-center justify-center h-40 overflow-hidden z-10">
        <h1 className="text-4xl font-bold text-center text-white">
          {user.username}
        </h1>
        <CanvasRevealEffect
          animationSpeed={5}
          containerClassName="bg-transparent absolute inset-0 pointer-events-none"
          colors={[
            [59, 130, 246],
            [139, 92, 246],
          ]}
          dotSize={3}
        />
      </div>

      <GlowingStarsBackgroundCard className="absolute inset-0 z-0" />
      <div className="relative z-10 flex flex-col items-center text-white mt-8">
        <div className="flex justify-between items-center w-full px-48 "> 
          <div className="flex flex-col items-center">
            <img
              src={user.avatar || '/default-avatar.png'}
              alt={user.username}
              className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4"
            />
            <p className="text-gray-400">{user.bio || 'No bio available.'}</p>
          </div>
          <div className="flex flex-col items-center">
          <div className="flex space-x-3">
            <p className="mt-2 text-gray-300">{user.followers.length} Followers</p>
            <p className="mt-2 text-gray-300">{user.following.length} Following</p>
            </div>
           
            <div className="flex space-x-4 mt-4">
              <button className="btn btn-primary">Follow</button>
              <button className="btn">Message</button>
            </div>
            
          </div>
        </div>

        <div className="mt-8 w-full">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.posts.map((post: Post) => (
              <div className="card w-full bg-base-100 shadow-xl" key={post._id}>
                <figure>
                  <img src={post.imageUrl} alt={post.title} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{post.title}</h2>
                  <p>{post.description || 'No description available.'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTemplate;