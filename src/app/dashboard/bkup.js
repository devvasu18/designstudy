"use client";
import React, { useState, useEffect } from 'react';
import { MoreVertical, Lock, Heart, MessageCircle, Share, Plus, Search, Bell } from 'lucide-react';

const StoryViewModal = ({ story, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  
  const storyUsers = [
    {
      id: 2,
      username: 'priya',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      timeAgo: '2h',
      images: [
        'https://randomuser.me/api/portraits/women/44.jpg',
        'https://randomuser.me/api/portraits/women/45.jpg',
        'https://randomuser.me/api/portraits/women/46.jpg'
      ]
    },
    {
      id: 4,
      username: 'anjali',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      timeAgo: '4h',
      images: [
        'https://randomuser.me/api/portraits/women/68.jpg',
        'https://randomuser.me/api/portraits/women/69.jpg',
        'https://randomuser.me/api/portraits/women/70.jpg'
      ]
    },
    {
      id: 6,
      username: 'kavya',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      timeAgo: '6h',
      images: [
        'https://randomuser.me/api/portraits/women/33.jpg',
        'https://randomuser.me/api/portraits/women/34.jpg',
        'https://randomuser.me/api/portraits/women/35.jpg'
      ]
    }
  ];

  useEffect(() => {
    if (story) {
      const userIndex = storyUsers.findIndex(user => user.id === story.id);
      setCurrentUserIndex(userIndex !== -1 ? userIndex : 0);
      setCurrentIndex(0);
    }
  }, [story]);

  const currentUser = storyUsers[currentUserIndex];
  const storyImages = currentUser?.images || [];

  const nextStory = () => {
    if (currentIndex < storyImages.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      if (currentUserIndex < storyUsers.length - 1) {
        setCurrentUserIndex(prev => prev + 1);
        setCurrentIndex(0);
      }
    }
  };

  const prevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      if (currentUserIndex > 0) {
        setCurrentUserIndex(prev => prev - 1);
        const prevUser = storyUsers[currentUserIndex - 1];
        setCurrentIndex(prevUser.images.length - 1);
      }
    }
  };

  const nextUser = () => {
    if (currentUserIndex < storyUsers.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
      setCurrentIndex(0);
    }
  };

  const prevUser = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(prev => prev - 1);
      const prevUser = storyUsers[currentUserIndex - 1];
      setCurrentIndex(prevUser.images.length - 1);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextUser();
    }
    if (isRightSwipe) {
      prevUser();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!isOpen || !currentUser) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 z-10 safe-area-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
            />
            <div>
              <span className="text-white font-semibold text-sm">{currentUser.username}</span>
              <div className="text-white/80 text-xs">{currentUser.timeAgo}</div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Progress bars */}
        <div className="flex space-x-1 mt-4">
          {storyImages.map((_, index) => (
            <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-white rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-full' : index < currentIndex ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Story Content */}
      <div 
        className="relative w-full h-full max-w-md mx-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={storyImages[currentIndex]}
          alt={`Story ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Navigation Areas */}
        <button 
          onClick={prevStory}
          className="absolute left-0 top-0 w-1/3 h-full bg-transparent z-20"
          aria-label="Previous story"
        />
        <button 
          onClick={nextStory}
          className="absolute right-0 top-0 w-1/3 h-full bg-transparent z-20"
          aria-label="Next story"
        />
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 safe-area-bottom">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex space-x-3">
            <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110">
              <Heart className="w-5 h-5 text-white" />
            </button>
            <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110">
              <MessageCircle className="w-5 h-5 text-white" />
            </button>
            <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110">
              <Share className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="text-white/80 text-sm font-medium px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full">
            {currentIndex + 1} / {storyImages.length}
          </div>
        </div>
      </div>
    </div>
  );
};


const ProfileHeader = ({ onMore, isScrolled }) => {
  if (!isScrolled) return null;
  
  return (
    <div className="bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-40 shadow-sm transition-all duration-300 safe-area-top">
      <div className="w-6"></div>
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Vasu Dev
        </span>
      </div>
      <button 
        onClick={onMore} 
        className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110"
      >
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

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

const StoriesSwiper = ({ onStoryClick, onAddStory, isSticky }) => {
  const [stories, setStories] = useState([
    { id: 1, username: 'vasudev', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', hasNewStory: false, isOwn: true, timeAgo: 'Add story' },
    { id: 2, username: 'priya', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', hasNewStory: true, timeAgo: '2h' },
    { id: 3, username: 'rahul', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', hasNewStory: false, timeAgo: '1d' },
    { id: 4, username: 'anjali', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', hasNewStory: true, timeAgo: '4h' },
    { id: 5, username: 'arjun', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', hasNewStory: false, timeAgo: '2d' },
    { id: 6, username: 'kavya', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', hasNewStory: true, timeAgo: '6h' },
  ]);

  return (
    <div className={`bg-white px-3 py-3 border-b border-gray-100 transition-all duration-300 ${
      isSticky ? 'sticky top-0 z-50 shadow-lg backdrop-blur-md bg-white/95' : ''
    }`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800 px-1">Stories</h2>
        <div className="text-xs text-purple-600 font-medium cursor-pointer hover:text-purple-800 transition-colors">View all</div>
      </div>
      <div className="flex space-x-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {stories.map((story) => (
          <button 
            key={story.id}
            onClick={() => story.isOwn ? onAddStory?.() : onStoryClick?.(story)}
            className="flex flex-col items-center space-y-2 flex-shrink-0 group"
          >
            <div className="relative">
              <div className={`w-16 h-16 rounded-full p-0.5 transition-all duration-300 ${
                story.hasNewStory
                  ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 group-hover:scale-110 shadow-lg'
                  : story.isOwn
                  ? 'bg-gradient-to-r from-gray-300 to-gray-400 group-hover:scale-110 shadow-md'
                  : 'bg-gray-200 group-hover:scale-105'
              }`}>
                <div className="relative w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                  <img
                    src={story.avatar}
                    alt={story.username}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
              </div>
              {story.isOwn && (
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                  <Plus className="w-2.5 h-2.5 text-white" />
                </div>
              )}
              {story.hasNewStory && !story.isOwn && (
                <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
              )}
            </div>
            <span className="text-xs text-gray-700 truncate max-w-[60px] block group-hover:text-purple-600 transition-colors font-medium">
              {story.isOwn ? 'Your story' : story.username}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const SecretStalkersContent = ({ onUnlock }) => {
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: 'Divanshu Joshi',
      username: '@divanshu.joshi.5',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      type: 'Friend',
      locked: false,
      lastSeen: '2 hours ago'
    },
    {
      id: 2,
      name: 'Riya Sharma',
      username: '@riya.sharma',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      type: 'Friend',
      locked: false,
      lastSeen: '1 day ago'
    },
    {
      id: 3,
      name: 'Secret Stalker',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
      type: 'Secret Stalker',
      locked: true,
      lastSeen: 'Recently'
    },
    {
      id: 4,
      name: 'Secret Stalker',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      type: 'Secret Stalker',
      locked: true,
      lastSeen: 'Recently'
    },
    {
      id: 5,
      name: 'Secret Stalker',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      type: 'Secret Stalker',
      locked: true,
      lastSeen: 'Recently'
    },
    {
      id: 6,
      name: 'Secret Stalker',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
      type: 'Secret Stalker',
      locked: true,
      lastSeen: 'Recently'
    },
    {
      id: 7,
      name: 'Secret Stalker',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      type: 'Secret Stalker',
      locked: true,
      lastSeen: 'Recently'
    },
    {
      id: 8,
      name: 'Secret Stalker',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      type: 'Secret Stalker',
      locked: true,
      lastSeen: 'Recently'
    }
  ]);

  const handleUnlock = (friendId) => {
    setFriends(friends.map(friend => 
      friend.id === friendId 
        ? { ...friend, locked: false, name: 'Mystery User', username: '@mystery.user' }
        : friend
    ));
    onUnlock(friendId);
  };

  return (
    <div className="bg-white">
      {/* Section Header */}
      <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Secret Stalkers</h2>
            <p className="text-sm text-gray-600 mt-1">Who's been checking your profile</p>
          </div>
          <div className="text-2xl">🕵️</div>
        </div>
      </div>
      
      {/* Friends List */}
      <div className="space-y-1">
        {friends.map((friend, index) => (
          <div 
            key={friend.id} 
            className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer border-b border-gray-50 last:border-b-0 group"
            onClick={() => friend.locked && handleUnlock(friend.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className={`w-14 h-14 rounded-full overflow-hidden transition-all duration-300 ${
                  friend.locked ? 'blur-sm grayscale group-hover:blur-none group-hover:grayscale-0' : ''
                } shadow-md`}>
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {friend.locked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full group-hover:bg-black/20 transition-colors duration-300">
                    <Lock className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-base group-hover:text-purple-600 transition-colors">
                  {friend.locked ? '🔒 Tap to unlock' : friend.name}
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  {friend.locked ? 'Hidden identity' : friend.username}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    friend.locked ? 'bg-orange-400 animate-pulse' : 'bg-green-400'
                  }`}></div>
                  <span className="text-xs text-gray-400">
                    {friend.locked ? 'Recently active' : `Active ${friend.lastSeen}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                friend.type === 'Friend' 
                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 group-hover:scale-105' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200 group-hover:scale-105'
              }`}>
                {friend.type}
              </div>
              {!friend.locked && (
                <button className="p-2 bg-gray-100 rounded-full hover:bg-purple-100 hover:text-purple-600 transition-all duration-200 hover:scale-110">
                  <MessageCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="px-4 py-6 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-purple-50">
        <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
          <div className="flex items-center justify-center gap-2">
            <span>🔍</span>
            <span>Discover more secret stalkers</span>
          </div>
        </button>
      </div>
    </div>
  );
};

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
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-6 right-6 px-6 py-4 rounded-2xl shadow-2xl z-50 transform transition-all duration-300 backdrop-blur-lg animate-slide-in ${
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

const onClickFeatures = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isFollowing, setIsFollowing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [storiesSticky, setStoriesSticky] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 10);
      
      // Make stories sticky when scrolling past the profile section (around 300px)
      setStoriesSticky(currentScrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    showNotification(
      isFollowing ? '💔 Unfollowed successfully' : '💜 Following Vasu!', 
      'success'
    );
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setIsStoryModalOpen(true);
  };

  const handleAddStory = () => {
    showNotification('📸 Story creation coming soon!', 'info');
  };

  const handleUnlock = (friendId) => {
    showNotification('🎉 Secret stalker revealed!', 'success');
  };

  const handleMore = () => {
    showNotification('⚙️ More options...', 'info');
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative overflow-x-hidden">
      {/* Header */}
      <ProfileHeader onMore={handleMore} isScrolled={isScrolled} />
      
      {/* Profile Info Card */}
      <ProfileInfoCard onFollow={handleFollow} isFollowing={isFollowing} />
      
      {/* Stories Swiper */}
      <StoriesSwiper 
        onStoryClick={handleStoryClick} 
        onAddStory={handleAddStory}
        isSticky={storiesSticky}
      />
      
      {/* Content */}
      <SecretStalkersContent onUnlock={handleUnlock} />
      
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
      
      {/* Story View Modal */}
      <StoryViewModal 
        story={selectedStory}
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
      />
      
      {/* Add bottom padding to account for fixed navigation */}
      <div className="h-24"></div>
    </div>
  );
};

export default SocialProfileApp;
  