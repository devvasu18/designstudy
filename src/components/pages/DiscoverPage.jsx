"use client";
import React, { useState, useEffect } from 'react';
import { Search, Heart, MessageCircle, Star, Home, BarChart3, User } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setSelectedStory } = useAppContext();

  useEffect(() => {
    // Mock data matching the screenshot
    setUsers([
      { id: 1, username: 'divya_holi', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', hasStory: true, isVerified: false },
      { id: 2, username: 'tejasvini', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', hasStory: true, isVerified: false },
      { id: 3, username: 'maahi_upa', avatar: 'https://randomuser.me/api/portraits/women/67.jpg', hasStory: true, isVerified: false },
      { id: 4, username: 'aman_math', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', hasStory: true, isVerified: false },
      { id: 5, username: 'hiteshgehi', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', hasStory: true, isVerified: false },
      { id: 6, username: 'rumit.meht', avatar: 'https://randomuser.me/api/portraits/men/28.jpg', hasStory: true, isVerified: false },
      { id: 7, username: 'dilipksola', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', hasStory: true, isVerified: false },
      { id: 8, username: 'rajveer948', avatar: 'https://randomuser.me/api/portraits/men/41.jpg', hasStory: true, isVerified: false },
      { id: 9, username: 'sharma_mon', avatar: 'https://randomuser.me/api/portraits/women/29.jpg', hasStory: true, isVerified: false },
      { id: 10, username: 'priya_dev', avatar: 'https://randomuser.me/api/portraits/women/15.jpg', hasStory: true, isVerified: true },
      { id: 11, username: 'rohit_kumar', avatar: 'https://randomuser.me/api/portraits/men/18.jpg', hasStory: true, isVerified: false },
      { id: 12, username: 'sneha_art', avatar: 'https://randomuser.me/api/portraits/women/52.jpg', hasStory: true, isVerified: true },
      { id: 13, username: 'vikash_23', avatar: 'https://randomuser.me/api/portraits/men/38.jpg', hasStory: true, isVerified: false },
      { id: 14, username: 'anjali_99', avatar: 'https://randomuser.me/api/portraits/women/71.jpg', hasStory: true, isVerified: false },
      { id: 15, username: 'arjun_fit', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', hasStory: true, isVerified: true },
      { id: 16, username: 'kavya_pic', avatar: 'https://randomuser.me/api/portraits/women/84.jpg', hasStory: true, isVerified: false },
      { id: 17, username: 'deepak_travel', avatar: 'https://randomuser.me/api/portraits/men/62.jpg', hasStory: true, isVerified: false },
      { id: 18, username: 'riya_music', avatar: 'https://randomuser.me/api/portraits/women/37.jpg', hasStory: true, isVerified: true },
      { id: 19, username: 'sahil_code', avatar: 'https://randomuser.me/api/portraits/men/75.jpg', hasStory: true, isVerified: false },
      { id: 20, username: 'pooja_dance', avatar: 'https://randomuser.me/api/portraits/women/91.jpg', hasStory: true, isVerified: false },
      { id: 21, username: 'karan_gym', avatar: 'https://randomuser.me/api/portraits/men/48.jpg', hasStory: true, isVerified: false },
      { id: 22, username: 'neha_food', avatar: 'https://randomuser.me/api/portraits/women/26.jpg', hasStory: true, isVerified: true },
      { id: 23, username: 'amit_bike', avatar: 'https://randomuser.me/api/portraits/men/83.jpg', hasStory: true, isVerified: false },
      { id: 24, username: 'shreya_yoga', avatar: 'https://randomuser.me/api/portraits/women/58.jpg', hasStory: true, isVerified: false },
      { id: 25, username: 'harsh_gamer', avatar: 'https://randomuser.me/api/portraits/men/27.jpg', hasStory: false, isVerified: false },
      { id: 26, username: 'isha_books', avatar: 'https://randomuser.me/api/portraits/women/43.jpg', hasStory: false, isVerified: false },
      { id: 27, username: 'rahul_tech', avatar: 'https://randomuser.me/api/portraits/men/59.jpg', hasStory: true, isVerified: true },
      { id: 28, username: 'tanya_art', avatar: 'https://randomuser.me/api/portraits/women/72.jpg', hasStory: false, isVerified: false },
      { id: 29, username: 'gaurav_sports', avatar: 'https://randomuser.me/api/portraits/men/34.jpg', hasStory: true, isVerified: false },
      { id: 30, username: 'meera_fashion', avatar: 'https://randomuser.me/api/portraits/women/19.jpg', hasStory: true, isVerified: true },
    ]);
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
    <div className="max-w-md mx-auto bg-white min-h-screen relative">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        {/* Title */}
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-500 text-center">Secret Stories</h1>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full border-none outline-none text-sm placeholder-gray-500 focus:bg-gray-200 transition-colors duration-200"
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
                      : 'bg-gray-200'
                  }`}>
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
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
                <p className="text-sm font-medium text-gray-900 truncate max-w-[80px] group-hover:text-purple-600 transition-colors">
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

// Bottom Navigation Component
const BottomNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Search, label: 'Discover' },
    { id: 'stats', icon: BarChart3, label: 'Stats' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-4 py-3 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button 
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-2xl transition-all duration-300 transform ${
                activeTab === tab.id 
                  ? 'text-purple-500 scale-110 animate-pulse' 
                  : 'text-gray-400 hover:text-gray-600 hover:scale-105'
              }`}
            >
              <IconComponent className="w-6 h-6" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Main App Component
const SocialProfileApp = () => {
  const [activeTab, setActiveTab] = useState('discover');

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative overflow-x-hidden">
      <DiscoverPage />
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default SocialProfileApp;