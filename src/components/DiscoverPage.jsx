"use client";
import React, { useState } from 'react';
import { Search, Heart, MessageCircle, UserPlus, Star } from 'lucide-react';
const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [followedUsers, setFollowedUsers] = useState(new Set());

  // Sample users data matching your screenshot
  const users = [
    { id: 1, username: 'santoshsha', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', hasStory: true, isVerified: false },
    { id: 2, username: 'bhaktipath', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', hasStory: true, isVerified: true },
    { id: 3, username: 'butatidham', avatar: 'https://randomuser.me/api/portraits/men/67.jpg', hasStory: true, isVerified: false },
    { id: 4, username: 'karni_mata', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', hasStory: true, isVerified: false },
    { id: 5, username: 'jagannath', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', hasStory: true, isVerified: true },
    { id: 6, username: 'abhijeet_s', avatar: 'https://randomuser.me/api/portraits/men/33.jpg', hasStory: true, isVerified: false },
    { id: 7, username: 'pranavsank', avatar: 'https://randomuser.me/api/portraits/men/89.jpg', hasStory: true, isVerified: false },
    { id: 8, username: 'vikramchar', avatar: 'https://randomuser.me/api/portraits/men/75.jpg', hasStory: true, isVerified: true },
    { id: 9, username: 'its_me_jan', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', hasStory: true, isVerified: false },
    { id: 10, username: 'rajesh_k', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', hasStory: true, isVerified: false },
    { id: 11, username: 'maya_patel', avatar: 'https://randomuser.me/api/portraits/women/89.jpg', hasStory: true, isVerified: true },
    { id: 12, username: 'harsh_21', avatar: 'https://randomuser.me/api/portraits/men/77.jpg', hasStory: true, isVerified: false },
  ];

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
    // Handle story viewing logic here
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 safe-area-top">
        {/* Title */}
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 text-center">Secret Stories</h1>
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
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-2xl border-none outline-none text-sm placeholder-gray-500 focus:bg-gray-200 transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex flex-col items-center group">
              {/* Profile Picture with Story Ring */}
              <div className="relative mb-3">
                <button
                  onClick={() => handleStoryClick(user)}
                  className="relative block"
                >
                  <div className={`w-20 h-20 rounded-full p-0.5 transition-all duration-300 group-hover:scale-105 ${
                    user.hasStory 
                      ? 'bg-gradient-to-tr from-purple-400 via-pink-400 to-red-400 shadow-lg' 
                      : 'bg-gray-200'
                  }`}>
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </button>

                {/* Verified Badge */}
                {user.isVerified && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                    <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                )}

                {/* Follow Button */}
                <button
                  onClick={() => handleFollow(user.id)}
                  className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center ${
                    followedUsers.has(user.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {followedUsers.has(user.id) ? (
                    <div className="w-3 h-3 text-white">✓</div>
                  ) : (
                    <UserPlus className="w-3 h-3" />
                  )}
                </button>
              </div>

              {/* Username */}
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 truncate max-w-[80px] group-hover:text-purple-600 transition-colors">
                  {user.username}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                <button className="p-1.5 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors">
                  <Heart className="w-3 h-3" />
                </button>
                <button className="p-1.5 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 transition-colors">
                  <MessageCircle className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="px-4 py-6 pb-20">
        <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          <div className="flex items-center justify-center gap-2">
            <Star className="w-4 h-4" />
            <span>Discover More Stories</span>
          </div>
        </button>
      </div>

      {/* Bottom Navigation Space */}
      <div className="h-20"></div>
    </div>
  );
};

// Updated main app component with tab handling
const SocialProfileApp = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [isFollowing, setIsFollowing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [storiesSticky, setStoriesSticky] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  const BottomNavigation = ({ activeTab, onTabChange }) => {
    const tabs = [
      { id: 'home', icon: '🏠', label: 'Home' },
      { id: 'discover', icon: '🔍', label: 'Discover' },
      { id: 'stats', icon: '📊', label: 'Stats' },
      { id: 'profile', icon: '👤', label: 'Profile' },
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-4 py-3 z-50 safe-area-bottom">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-2xl transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110 shadow-lg transform' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-xs font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const NotificationToast = ({ message, type, onClose }) => {
    React.useEffect(() => {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }, [onClose]);

    return (
      <div className={`fixed top-6 right-6 px-6 py-4 rounded-2xl shadow-2xl z-50 transform transition-all duration-300 backdrop-blur-lg ${
        type === 'success' ? 'bg-green-500/90 text-white' : 'bg-purple-500/90 text-white'
      }`}>
        <div className="flex items-center gap-3">
          <span className="text-lg">
            {type === 'success' ? '✅' : 'ℹ️'}
          </span>
          <span className="font-medium">{message}</span>
          <button 
            onClick={onClose}
            className="ml-2 text-white/80 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    );
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const renderTabContent = () => {
  switch (activeTab) {
    case "home":
      return <HomePageContent />;   // import from components/HomePageContent.jsx
    case "discover":
      return <DiscoverPage />;
    case "stats":
      return <StatsPage />;
    case "profile":
      return <ProfilePage />;
    default:
      return <HomePageContent />;
  }
};


  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative overflow-x-hidden">
      {renderTabContent()}
      
      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Notification Toast */}
      {notification && (
        <NotificationToast 
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default SocialProfileApp;