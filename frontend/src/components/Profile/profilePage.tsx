import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { startConversation } from '@/services/message/startConversation';
import { UserProfile } from '@/services/user/getUserProfile';
import { GlowingStarsBackgroundCard } from '@/components/ui/glowing-stars';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';
import { Heart, MessageCircle } from 'lucide-react';
import './profilePage.css';
import PostSection from '../post/PostSection';
import { followUser} from '@/services/user/followUser'; 
import { unfollowUser } from '@/services/user/unfollowUser'; 

export interface Post {
  _id: string;
  title: string;
  author: string;
  content: string;
  images: string[];
  description: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  count: number; // Assuming count refers to views, likes, etc.
  comments: { username: string; comment: string }[];    
  username: string; // Assuming username field exists in the post object 
}
interface ProfileTemplateProps {
  initialUser: UserProfile | null;
  loading: boolean;
  posts: Post[];
}

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ initialUser, loading, posts }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
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
      await followUser(currentUser, user._id);
      setIsFollowing(true);
      setFollowerCount(prev => prev + 1);
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  const handleUnfollow = async () => {
    if (!user || !currentUser) return;
    try {
      await unfollowUser(currentUser, user._id);
      setIsFollowing(false);
      setFollowerCount(prev => prev - 1);
    } catch (error) {
      console.error('Failed to unfollow user:', error);
    }
  };

  const onMessageClick = async () => {
    if (!user || !currentUser) return;
    try {
      const { conversationId } = await startConversation(currentUser, user._id);
      router.push(`/messages/conversation/${conversationId}?recipientId=${user._id}`);
    } catch (error) {
      console.error('Error in starting conversation:', error);
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
    <div className="relative w-full min-h-screen overflow-hidden profile-template bg-gray-1000">
      {/* Banner Section */}
      {/* <div className="relative flex flex-col items-center justify-center h-32 overflow-hidden z-10">
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
      </div> */}

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
              className="w-48 h-48 rounded-full border-2 border-gray-300 object-cover"
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
                  <button className="btn btn-primary" onClick={() => router.push('/settings')}>Settings</button>
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
                  <button className="btn" onClick={onMessageClick}>Message</button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-6 p-4 w-full overflow-hidden">
          <h2 className="text-2xl text-gray-300 m-2 font-semibold mb-3 w-full">Posts</h2>
          {isFollowing ? (
            <div className="w-full flex flex-wrap gap-6 justify-between">
             <PostSection posts={posts} username={user.username} API_BASE_URL={process.env.NEXT_PUBLIC_API_BASE_URL || ''} />

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
