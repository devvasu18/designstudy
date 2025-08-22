"use client";
import React, { useState, useEffect } from 'react';
import { Search, Heart, MessageCircle, Star, Home, BarChart3, User } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { getStoriesForDiscoverPage } from '@/data/storyData';

const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setSelectedStory, isDarkMode } = useAppContext();

  useEffect(() => {
    // Load users from centralized story data
    setUsers(getStoriesForDiscoverPage());
  }, []);

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFollow = (userId) => {
    const newFollowedUsers = new Set(followedUsers);
    if (newFollowedUsers.has(userId)) {
      newFollowedUsers.delete(userId);
    } else {
      newFollowedUsers.add(userId);
    }
    setFollowedUsers(newFollowedUsers);
  };

  const handleStoryClick = (user) => {
    console.log('Story clicked:', user);
    // Set the selected story to open the modal
    setSelectedStory(user);
  };

  return (
    <div className={`max-w-md mx-auto min-h-screen relative transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
      }`}>
        {/* Title */}
        <div className="px-4 py-6">
          <h1 className={`text-2xl font-bold text-center transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>Secret Stories</h1>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-full border-none outline-none text-sm transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-700' 
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-gray-200'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Users Grid with Floating Animation */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <div 
              key={user.id} 
              className="flex flex-col items-center group"
              style={{
                animation: `float ${3 + (index % 3) * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Profile Picture with Story Ring */}
              <div className="relative mb-2">
                <button
                  onClick={() => handleStoryClick(user)}
                  className="relative block transform transition-all duration-300 hover:scale-110"
                >
                  <div className={`w-20 h-20 rounded-full p-1 transition-all duration-300 ${
                    user.hasStory 
                      ? 'bg-gradient-to-tr from-purple-400 via-pink-400 to-red-400 shadow-lg animate-pulse' 
                      : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    <div className={`relative w-full h-full rounded-full overflow-hidden ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </button>

              </div>

              {/* Username */}
              <div className="text-center">
                <p className={`text-sm font-medium truncate max-w-[80px] transition-colors ${
                  isDarkMode 
                    ? 'text-white group-hover:text-purple-400' 
                    : 'text-gray-900 group-hover:text-purple-600'
                }`}>
                  {user.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Space */}
      <div className="h-20"></div>

      {/* Floating Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-5px) rotate(-1deg);
          }
          75% {
            transform: translateY(-15px) rotate(0.5deg);
          }
        }
        
        @keyframes bubble-float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        
        .animate-bubble-float {
          animation: bubble-float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DiscoverPage;