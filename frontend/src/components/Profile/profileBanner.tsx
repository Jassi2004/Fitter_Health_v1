// // ProfileBanner.tsx
// "use client";

// import React from 'react';
// import { CardSpotlight } from '@/components/ui/card-spotlight';

// const ProfileBanner: React.FC<{ username: string }> = ({ username }) => {
//   return (
//     <div className="absolute top-0 left-0 w-full h-40 flex items-center justify-center z-10">
//       <CardSpotlight 
//         radius={350} 
//         color="#4b5563" 
//         className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900 w-full h-full flex items-center justify-center"
//       >
//         <h1 className="text-4xl font-bold text-center text-white">
//           {username}
//         </h1>
//       </CardSpotlight>
//     </div>
//   );
// };

// export default ProfileBanner;
// ProfileBanner.tsx
// ProfileBanner.tsx
"use client";

import React from 'react';

const ProfileBanner: React.FC<{ username: string }> = ({ username }) => {
  return (
    <div className="relative w-full h-40 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-gray-600">
      <div className="absolute inset-0 bg-gray-900 opacity-50 transition duration-300 group-hover:opacity-100 z-0"></div>
      
      
      <h1 className="relative z-10 text-4xl font-bold text-center text-white">{username}</h1>
    </div>
  );
};

export default ProfileBanner;

