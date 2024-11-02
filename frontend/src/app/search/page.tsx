"use client";
// import React, { useState, useRef } from 'react';
// import UserCard from '../../components/user/userCard';
// import UserSearchInput from '../../components/user/userSearchInput';
// import { searchUsers } from '../../services/user/searchUser';
// import { followUser } from '../../services/user/followUser';
// import { unfollowUser } from '../../services/user/unfollowUser';
// import { useOutsideClick } from '../../hooks/use-outside-click';
// import { toast } from 'react-toastify';

// const UserSearchPage: React.FC = () => {
//   const [query, setQuery] = useState('');
//   const [users, setUsers] = useState<any[]>([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const currentUserId = 'CURRENT_USER_ID'; 

//   const handleOutsideClick = () => {
//     setIsDropdownOpen(false);
//   };

//   useOutsideClick(dropdownRef, handleOutsideClick);

//   const handleSearch = async () => {
//     if (!query) return;
//     setLoading(true);
//     try {
//       const result = await searchUsers(query);
//       setUsers(result);
//       setIsDropdownOpen(true);
//     } catch (error) {
//       console.error('Error searching users:', error);
//       toast.error('Error searching users. Please try again.'); // Show error notification
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFollow = async (followId: string) => {
//     try {
//       await followUser(currentUserId, followId);
//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user._id === followId ? { ...user, isFollowing: true } : user
//         )
//       );
//       toast.success('You are now following this user!');
//     } catch (error) {
//       console.error('Error following user:', error);
//       toast.error('Error following user. Please try again.');
//     }
//   };

//   const handleUnfollow = async (unfollowId: string) => {
//     try {
//       await unfollowUser(currentUserId, unfollowId);
//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user._id === unfollowId ? { ...user, isFollowing: false } : user
//         )
//       );
//       toast.success('You have unfollowed this user!');
//     } catch (error) {
//       console.error('Error unfollowing user:', error);
//       toast.error('Error unfollowing user. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>Search Users</h1>
//       <UserSearchInput
//         query={query}
//         onChange={(e) => {
//           setQuery(e.target.value);
//           if (e.target.value === '') {
//             setUsers([]);
//             setIsDropdownOpen(false);
//           }
//         }}
//         onSearch={handleSearch}
//       />
//       {loading && <p>Loading...</p>} {/* Loading state indicator */}
//       {isDropdownOpen && users.length > 0 && (
//         <div
//           ref={dropdownRef}
//           style={{
//             border: '1px solid #ddd',
//             padding: '10px',
//             maxWidth: '300px',
//             backgroundColor: 'white',
//             position: 'absolute',
//             zIndex: 1,
//           }}
//         >
//           <div className="user-list">
//             {users.map((user) => (
//               <UserCard
//                 key={user._id}
//                 username={user.username}
//                 email={user.email}
//                 isFollowing={user.isFollowing}
//                 onFollow={() => handleFollow(user._id)}
//                 onUnfollow={() => handleUnfollow(user._id)}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserSearchPage;
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { searchUsers } from '@/services/user/searchUser';
import { followUser } from '@/services/user/followUser';
import { unfollowUser } from '@/services/user/unfollowUser';
import { toast } from 'react-toastify';

interface User {
  _id: string;
  username: string;
  email: string;
  isFollowing: boolean;
}

interface CloseIconProps {
  className?: string;
}

const UserSearchPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [active, setActive] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const user = localStorage.getItem("userId");
const currentUserId: string = user ? user : ''; 
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const handleSearch = async (): Promise<void> => {
    if (!query) return;
    setLoading(true);
    try {
      const result = await searchUsers(query);
      setUsers(result);
    } catch (error) {
      console.error('Error searching users:', error);
      toast.error('Error searching users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.username}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.username}-${id}`}>
                <img
                  src="/api/placeholder/200/200"
                  alt={active.username}
                  className="w-full h-80 object-cover object-top"
                />
              </motion.div>

              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h3
                      layoutId={`username-${active.username}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.username}
                    </motion.h3>
                    <motion.p
                      layoutId={`email-${active.email}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.email}
                    </motion.p>
                  </div>

                  <motion.button
                    layoutId={`button-${active.username}-${id}`}
                    onClick={() =>
                      active.isFollowing
                        ? handleUnfollow(active._id)
                        : handleFollow(active._id)
                    }
                    className={`px-4 py-3 text-sm rounded-full font-bold ${
                      active.isFollowing
                        ? "bg-gray-200 text-gray-800"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {active.isFollowing ? "Unfollow" : "Follow"}
                  </motion.button>
                </div>
                
                <div className="pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 dark:text-neutral-400"
                  >
                    <p>User profile information and additional details can go here.</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-8 flex">
          <input
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setQuery(e.target.value);
              if (e.target.value === '') {
                setUsers([]);
              }
            }}
            placeholder="Search users..."
            className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSearch}
            className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Search
          </button>
        </div>

        <ul className="max-w-2xl mx-auto w-full gap-4">
          {users.map((user) => (
            <motion.div
              layoutId={`card-${user.username}-${id}`}
              key={`card-${user.username}-${id}`}
              onClick={() => setActive(user)}
              className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col md:flex-row">
                <motion.div layoutId={`image-${user.username}-${id}`}>
                  <img
                    src="/api/placeholder/100/100"
                    alt={user.username}
                    className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                  />
                </motion.div>
                <div>
                  <motion.h3
                    layoutId={`username-${user.username}-${id}`}
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                  >
                    {user.username}
                  </motion.h3>
                  <motion.p
                    layoutId={`email-${user.email}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                  >
                    {user.email}
                  </motion.p>
                </div>
              </div>
              <motion.button
                layoutId={`button-${user.username}-${id}`}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  user.isFollowing
                    ? handleUnfollow(user._id)
                    : handleFollow(user._id);
                }}
                className={`px-4 py-2 text-sm rounded-full font-bold mt-4 md:mt-0 ${
                  user.isFollowing
                    ? "bg-gray-100 text-gray-800"
                    : "bg-gray-100 hover:bg-purple-500 hover:text-white text-black"
                }`}
              >
                {user.isFollowing ? "Unfollow" : "Follow"}
              </motion.button>
            </motion.div>
          ))}
        </ul>

        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto" />
          </div>
        )}
      </div>
    </>
  );
};

const CloseIcon: React.FC<CloseIconProps> = ({ className = "h-4 w-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

export default UserSearchPage;