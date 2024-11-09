import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../services/user/getUserProfile'; 
import { updateProfile } from '../../services/user/updateProfileFields'; 
import { updateImageService } from '../../services/user/updateProfileImage'; 

const AccountSettings = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [bio, setBio] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [image, setImage] = useState<File | null>(null); 
  const [imageUrl, setImageUrl] = useState<string>(''); 
  const API_URL =  process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      getUserProfile(userId)
        .then((profile) => {
          setUserProfile(profile);
          setBio(profile.bio || '');  
          setGender(profile.gender || '');
          setDob(profile.dob || '');
          if (profile.image) {
            setImageUrl(`${API_URL}/${profile.image}`);
          }
        })
        .catch((error) => {
          if (error instanceof Error) {
            console.error(`Error fetching user profile: ${error.message}`);
          } else {
            console.error('An unknown error occurred while fetching the user profile');
          }
        });
    }
  }, [API_URL]);

  const handleUpdateProfile = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User ID not found');
      return;
    }

    const updatedBio = bio !== userProfile?.bio ? bio : userProfile?.bio;
    const updatedGender = gender !== userProfile?.gender ? gender : userProfile?.gender;
    const updatedDob = dob !== userProfile?.dob ? dob : userProfile?.dob;

    try {
      const updatedProfile = await updateProfile(userId, updatedBio, updatedGender, updatedDob);
      alert('Profile updated successfully!');
      setUserProfile(updatedProfile);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred while updating profile');
      }
    }
  };

  const handleUpdateImage = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId || !image) {
      alert('User ID or image not found');
      return;
    }

    try {
      const updatedProfile = await updateImageService(userId, image);
      alert('Image updated successfully!');
      setUserProfile(updatedProfile);
      setImageUrl(URL.createObjectURL(image)); // Show new image preview immediately
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred while updating image');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const fileType = selectedFile.type;
        if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
          alert('Please upload an image in .jpg or .png format.');
          return;
        }
        setImage(selectedFile);
        setImageUrl(URL.createObjectURL(selectedFile)); // Display preview immediately
      }
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center p-2 w-screen ">
      <div className="w-full bg-gray-950 border-2 border-solid border-gray-800 p-6 px-32 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-2xl font-semibold mb-8 text-center">Account Settings</h2>
        
        {/* Image Section */}
        <div className="flex items-center mb-8">
          {imageUrl ? (
            <img
              src={imageUrl} // Use the updated preview URL
              alt="Profile"
              className="w-24 h-24 rounded-full mr-6"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-700 rounded-full mr-6"></div>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-medium mb-2">{userProfile?.username}</h3>
            <div className="flex space-x-4">
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                className="block p-2 bg-gray-700 text-white border border-gray-600 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleUpdateImage} 
                className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
              >
                Update Image
              </button>
            </div>
          </div>
        </div>

        {/* Bio, Gender, and DOB Section */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h3 className="text-xl font-medium mb-2">Bio</h3>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Gender</h3>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Date of Birth</h3>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg"
            />
          </div>
        </div>

        {/* Update Profile Button */}
        <div className="mt-8 text-right">
          <button 
            onClick={handleUpdateProfile}
            className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
