"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile, getUserProfile } from '@/services/user/getUserProfile';
import { GlowingStarsBackgroundCard } from '@/components/ui/glowing-stars';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';
import { followUser } from '@/services/user/followUser';
import { unfollowUser } from '@/services/user/unfollowUser';
import './profilePage.css';

interface Post {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
}

interface ProfileTemplateProps {
  initialUser: UserProfile | null;
  loading: boolean;
}

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ initialUser, loading }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState<number>(initialUser?.followers.length || 0);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setCurrentUser(storedUserId);
    if (initialUser) {
      setUser(initialUser);
      setIsFollowing(initialUser.followers.includes(storedUserId || ''));
      setFollowerCount(initialUser.followers.length);
    }
    if (user && currentUser) {
      setIsFollowing(user.followers.includes(currentUser));
      setFollowerCount(user.followers.length);
    }
  }, [user, currentUser, initialUser]);

  const handleFollow = async () => {
    if (user && currentUser) {
      await followUser(currentUser, user._id);
      setIsFollowing(true);
      setFollowerCount(prevCount => prevCount + 1);
    }
  };

  const handleUnfollow = async () => {
    if (user && currentUser) {
      await unfollowUser(currentUser, user._id);
      setIsFollowing(false);
      setFollowerCount(prevCount => prevCount - 1);
    }
  };

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
    <div className="relative w-full min-h-screen overflow-hidden profile-template">
      <div className="relative flex flex-col items-center justify-center h-40 overflow-hidden z-10">
        <h1 className="text-4xl font-bold text-center text-white">{user.username}</h1>
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
        <div className="flex justify-between items-center w-full px-48 py-12">
          <div className="flex flex-col items-center">
            <img
              src={`http://localhost:8080/${user.image}`}
              alt={user.username}
              className="w-36 h-36 rounded-full border-2 border-gray-300 mb-4 flex justify-center items-center"
            />
          </div>
          <div className="flex flex-col items-center px-20">
            <div className="flex space-x-3 font-bold">
              <p className="mt-2 text-gray-300">{user.posts.length || '0'} Posts</p>
              <p className="mt-2 text-gray-300">{followerCount} Followers</p>
              <p className="mt-2 text-gray-300">{user.following.length} Following</p>
            </div>
            <p className="mt-2 text-gray-400">{user.bio || 'No bio available.'}</p>

            <div className="flex space-x-4 mt-4">
              {currentUser === user._id ? (
                <>
                  <button className="btn btn-primary">Settings</button>
                  <button
                    className="btn"
                    onClick={() => router.push('/settings/account')}
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <>
                  {isFollowing ? (
                    <button className="btn btn-secondary" onClick={handleUnfollow}>
                      Unfollow
                    </button>
                  ) : (
                    <button className="btn btn-secondary" onClick={handleFollow}>
                      Follow
                    </button>
                  )}
                  <button className="btn">Message</button>
                </>
              )}
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
