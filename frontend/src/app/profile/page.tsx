"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/profile/getProfile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error : any) {
        if (error.response) {
          console.error('Error fetching user profile:', error.response.data); 
        } else {
          console.error('Error fetching user profile:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <h2>User not found.</h2>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center">
        <img
        //   src={user.avatar || '/default-avatar.png'}
          alt={user.username}
          className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4"
        />
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <p className="text-gray-600">{user.bio || 'No bio available.'}</p>
        <div className="flex space-x-4 mt-4">
          <button className="btn btn-primary">Follow</button>
          <button className="btn">Message</button>
        </div>
        <p className="mt-2">{user.followers.length} Followers</p>
        <p>{user.following.length} Following</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.posts.map((post: any) => (
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
  );
};

export default ProfilePage;
