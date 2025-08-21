'use client';
import { useState } from 'react';

const ProfileInfoCard = ({ onFollow, isFollowing }) => {
  const [showFullBio, setShowFullBio] = useState(false);
  
  return (
    <div className="bg-white pt-0">
      <div className="mx-4 mt-4 mb-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-3xl p-6 border border-purple-100/50 shadow-md backdrop-blur-sm">
        {/* Profile Picture and Name */}
        <div className="flex items-center space-x-5 mb-6">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 p-1 shadow-xl group-hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 rounded-full ring-2 ring-white/20"></div>
              </div>
            </div>
          </div>
          
          {/* Name and Info */}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Vasu Dev</h1>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm"></div>
              <span className="text-purple-600 font-medium text-sm">Digital Creator</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span className="text-gray-500 text-xs">Verified</span>
            </div>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/90 transition-all duration-300 cursor-pointer group hover:shadow-md">
            <div className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">398</div>
            <div className="text-xs text-gray-600 font-medium mb-2">Followers</div>
            <div className="w-full h-1.5 bg-purple-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-3/4 transition-all duration-500"></div>
            </div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/90 transition-all duration-300 cursor-pointer group hover:shadow-md">
            <div className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">238</div>
            <div className="text-xs text-gray-600 font-medium mb-2">Following</div>
            <div className="w-full h-1.5 bg-purple-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-2/3 transition-all duration-500"></div>
            </div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/90 transition-all duration-300 cursor-pointer group hover:shadow-md">
            <div className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">15</div>
            <div className="text-xs text-gray-600 font-medium mb-2">Posts</div>
            <div className="w-full h-1.5 bg-purple-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-1/4 transition-all duration-500"></div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Last updated</div>
          <div className="text-xs font-medium text-gray-600">06:00 PM, 19 Aug 2024</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
