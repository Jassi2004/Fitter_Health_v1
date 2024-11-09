"use client";
import React, { useEffect, useState } from 'react';
import { getUserProfile, UserProfile } from '@/services/user/getUserProfile';
import { getPostsByUser } from '@/services/post/getPostsByUser';
import ProfileTemplate from '@/components/Profile/profilePage';

const ProfilePage: React.FC<{ params: { userId: string } }> = ({ params }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<any[]>([]); // Store posts in state
  const [loading, setLoading] = useState<boolean>(true);
  const { userId } = params;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userProfile = await getUserProfile(userId);
        setUser(userProfile);

       
        const userPosts = await getPostsByUser(userId);
        setPosts(userPosts); 
        console.log(posts);
        

      } catch (error) {
        console.error('Failed to fetch user profile or posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

 
  useEffect(() => {
    console.log('Updated posts:', posts);
  }, [posts]);  

  return <ProfileTemplate initialUser={user} loading={loading} posts={posts} />;
};

export default ProfilePage;
