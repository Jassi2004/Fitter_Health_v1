"use client";

import React, { useId, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { searchUsers } from '@/services/user/searchUser';
import { followUser } from '@/services/user/followUser';
import { unfollowUser } from '@/services/user/unfollowUser';
import { toast } from 'react-toastify';
import { HoverEffect } from "@/components/ui/card-hover-effect"; // Adjust the import according to your folder structure
import './page.css';

interface User {
  _id: string;
  username: string;
  email: string;
  isFollowing: boolean;
  followers: string[];
}

const UserSearchPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const id = useId();
  const router = useRouter();
  const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;
  const currentUserId: string = userId ? userId : '';

  // Effect to run search when query changes
  useEffect(() => {
    const handleSearch = async (): Promise<void> => {
      if (!query) {
        setUsers([]); // Clear users if query is empty
        return;
      }
      setLoading(true);
      try {
        const result = await searchUsers(query);
        const updatedUsers = result.map((user: User) => ({
          ...user,
          isFollowing: user.followers.includes(currentUserId),
        }));
        setUsers(updatedUsers);
      } catch (error) {
        console.error('Error searching users:', error);
        toast.error('Error searching users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Debounce search function to prevent too many requests
    const debounceTimeout = setTimeout(handleSearch, 300); // 300 ms delay

    return () => clearTimeout(debounceTimeout); // Cleanup on unmount or when query changes
  }, [query, currentUserId]);

  const handleFollow = async (followId: string): Promise<void> => {
    try {
      await followUser(currentUserId, followId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === followId ? { ...user, isFollowing: true } : user
        )
      );
      toast.success('You are now following this user!');
    } catch (error) {
      console.error('Error following user:', error);
      toast.error('Error following user. Please try again.');
    }
  };

  const handleUnfollow = async (unfollowId: string): Promise<void> => {
    try {
      await unfollowUser(currentUserId, unfollowId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === unfollowId ? { ...user, isFollowing: false } : user
        )
      );
      toast.success('You have unfollowed this user!');
    } catch (error) {
      console.error('Error unfollowing user:', error);
      toast.error('Error unfollowing user. Please try again.');
    }
  };

  const items = users.map((user) => ({
    title: user.username,
    description: user.email,
    link: `/profile/${user._id}`,
    isFollowing: user.isFollowing,
    followId: user._id,
    handleFollow: user.isFollowing ? () => handleUnfollow(user._id) : () => handleFollow(user._id),
  }));

  return (
    <div className="search-page ">
      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-8 flex">
          <input
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setQuery(e.target.value);
            }}
            placeholder="Search users..."
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto" />
          </div>
        ) : (
          <HoverEffect items={items} />
        )}
      </div>
    </div>
  );
};

export default UserSearchPage;
