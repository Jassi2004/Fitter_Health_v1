"use client"
import React from 'react';

const UserCard: React.FC<{ 
  username: string; 
  email: string; 
  isFollowing: boolean; 
  onFollow: () => void; 
  onUnfollow: () => void; 
}> = ({ username, email, isFollowing, onFollow, onUnfollow }) => {
  return (
    <div className="user-card">
      <h3>{username}</h3>
      <p>{email}</p>
      {isFollowing ? (
        <button onClick={onUnfollow}>Unfollow</button>
      ) : (
        <button onClick={onFollow}>Follow</button>
      )}
    </div>
  );
};

export default UserCard; // Ensure you're using default export
