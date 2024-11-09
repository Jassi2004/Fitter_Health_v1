import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/services/user/getUserProfile';
import { GlowingStarsBackgroundCard } from '@/components/ui/glowing-stars';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';
import { Heart, MessageCircle } from 'lucide-react';
import './profilePage.css'

interface Post {
  _id: string;
  author: string;
  content: string;
  images: string[];
  videos: string[];
  likes?: number;
  comments?: number;
}

interface ProfileTemplateProps {
  initialUser: UserProfile | null;
  loading: boolean;
  posts: Post[];
}

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ initialUser, loading, posts }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState<number>(initialUser?.followers.length || 0);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setCurrentUser(storedUserId);

    if (initialUser) {
      setUser(initialUser);
      setIsFollowing(initialUser.followers.some(follower => follower._id === storedUserId));
      setFollowerCount(initialUser.followers.length);

      
    }
  }, [initialUser]);

  const handleFollow = async () => {
    if (!user || !currentUser) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followerId: currentUser,
          followingId: user._id,
        }),
      });

      if (response.ok) {
        setIsFollowing(true);
        setFollowerCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  const handleUnfollow = async () => {
    if (!user || !currentUser) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/unfollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followerId: currentUser,
          followingId: user._id,
        }),
      });

      if (response.ok) {
        setIsFollowing(false);
        setFollowerCount(prev => prev - 1);
      }
    } catch (error) {
      console.error('Failed to unfollow user:', error);
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
    <div className="relative w-full min-h-screen overflow-hidden profile-template bg-black">
      {/* Banner Section */}
      <div className="relative flex flex-col items-center justify-center h-32 overflow-hidden z-10">
        <h1 className="text-3xl font-bold text-center text-white">{user.username}</h1>
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

      <GlowingStarsBackgroundCard className="absolute inset-0 z-0 overflow-hidden" />

      {/* Profile Content */}
      <div className="relative z-10 flex flex-col items-center text-white mt-4 overflow-hidden">
        {/* Profile Info Section */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-32 py-8 max-w-7xl mx-auto">
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6 md:mb-0">
            <img
              src={`${API_BASE_URL}/${user.image}`}
              alt={user.username}
              className="w-36 h-36 rounded-full border-2 border-gray-300 object-cover"
            />
            <p className="text-gray-200 mt-4 text-m">{user.username}</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3 md:px-16">
            <div className="flex space-x-6 font-bold">
              <div className="text-center">
                <p className="text-lg">{posts.length}</p>
                <p className="text-gray-400 text-sm">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-lg">{followerCount}</p>
                <p className="text-gray-400 text-sm">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-lg">{user.following.length}</p>
                <p className="text-gray-400 text-sm">Following</p>
              </div>
            </div>

            {/* Bio */}
            <p className="text-center md:text-left text-gray-300">{user.bio || 'No bio available.'}</p>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-4">
              {currentUser === user._id ? (
                <>
                  <button className="btn btn-primary">Settings</button>
                  {/* <button
                    className="btn"
                    onClick={() => router.push('/settings/account')}
                  >
                    Edit Profile
                  </button> */}
                  <button
                    className="btn btn-secondary"
                    onClick={() => router.push('/post/create-post')}
                  >
                    Create Post
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
                  <button className="btn">
                    Message
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-6 p-4 w-full overflow-hidden">
          <h2 className="text-2xl text-gray-300 m-2 font-semibold mb-3">Posts</h2>
          {isFollowing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <div
                  className="card w-full bg-base-100 shadow-xl rounded-lg overflow-hidden border-2 border-gray-700"
                  key={post._id}
                >
                  <div className="flex flex-col items-left bg-gray-800 p-4">
                    <h3 className="text-white text-lg font-bold mb-2">{user.username}</h3>
                    <figure className="relative w-full h-48">
                      <img
                        src={`${API_BASE_URL}${post.images[0]}` || 'default-image-url.jpg'}
                        alt="Post"
                        className="object-cover w-full h-full"
                      />
                    </figure>
                  </div>
                  <div className="card-body p-4 flex flex-col justify-between h-28">
                    <p className="text-sm text-gray-500 line-clamp-3">{post.content || 'No content available.'}</p>
                    <div className="flex justify-between mt-auto text-sm text-gray-400">
                      <div className="flex items-center">
                        <Heart size={16} />
                        <span className="ml-2">{post.likes || 0}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle size={16} />
                        <span className="ml-2">{post.comments || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-8">
              <p>This account is private. Follow to see posts.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfileTemplate;
