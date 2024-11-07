"use client";
import React, { useEffect, useState } from 'react';
import { getUserProfile, UserProfile } from '@/services/user/getUserProfile';
import ProfileTemplate from '@/components/Profile/profilePage';

const ProfilePage: React.FC<{ params: { userId: string } }> = ({ params }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { userId } = params;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userProfile = await getUserProfile(userId);
        console.log(userProfile);
        
        setUser(userProfile);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  return <ProfileTemplate initialUser={user} loading={loading} />;
};

export default ProfilePage;