"use client";

import React from 'react';

const ProfileBanner: React.FC<{ username: string }> = ({ username }) => {
  return (
    <div className="relative w-full h-30 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-800">
      <div className="absolute inset-0 bg-gray-800 opacity-80 transition duration-300 group-hover:opacity-100 z-0"></div>
      <h1 className="relative z-10 text-4xl font-bold text-center text-white">{username}</h1>
    </div>
  );
};

export default ProfileBanner;