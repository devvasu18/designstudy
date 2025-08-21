import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share } from 'lucide-react';
const StoryViewModal = ({ story, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null); // For visual feedback
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const touchEndRef = useRef({ x: 0, y: 0, time: 0 });
  
  const storyUsers = [
    {
      id: 1,
      username: 'divya_holi',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      timeAgo: '1h',
      images: [
        'https://randomuser.me/api/portraits/women/44.jpg',
        'https://picsum.photos/400/600?random=1',
        'https://picsum.photos/400/600?random=2'
      ]
    },
    {
      id: 2,
      username: 'tejasvini',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      timeAgo: '2h',
      images: [
        'https://randomuser.me/api/portraits/men/22.jpg',
        'https://picsum.photos/400/600?random=3',
        'https://picsum.photos/400/600?random=4'
      ]
    },
    {
      id: 3,
      username: 'maahi_upa',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
      timeAgo: '3h',
      images: [
        'https://randomuser.me/api/portraits/women/67.jpg',
        'https://picsum.photos/400/600?random=5',
        'https://picsum.photos/400/600?random=6'
      ]
    },
    {
      id: 4,
      username: 'aman_math',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timeAgo: '4h',
      images: [
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://picsum.photos/400/600?random=7',
        'https://picsum.photos/400/600?random=8'
      ]
    },
    {
      id: 5,
      username: 'hiteshgehi',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      timeAgo: '5h',
      images: [
        'https://randomuser.me/api/portraits/men/45.jpg',
        'https://picsum.photos/400/600?random=9',
        'https://picsum.photos/400/600?random=10'
      ]
    },
    {
      id: 6,
      username: 'rumit.meht',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
      timeAgo: '6h',
      images: [
        'https://randomuser.me/api/portraits/men/28.jpg',
        'https://picsum.photos/400/600?random=11',
        'https://picsum.photos/400/600?random=12'
      ]
    },
    {
      id: 7,
      username: 'dilipksola',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      timeAgo: '7h',
      images: [
        'https://randomuser.me/api/portraits/women/33.jpg',
        'https://picsum.photos/400/600?random=13',
        'https://picsum.photos/400/600?random=14'
      ]
    },
    {
      id: 8,
      username: 'rajveer948',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      timeAgo: '8h',
      images: [
        'https://randomuser.me/api/portraits/men/41.jpg',
        'https://picsum.photos/400/600?random=15',
        'https://picsum.photos/400/600?random=16'
      ]
    },
    {
      id: 9,
      username: 'sharma_mon',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
      timeAgo: '9h',
      images: [
        'https://randomuser.me/api/portraits/women/29.jpg',
        'https://picsum.photos/400/600?random=17',
        'https://picsum.photos/400/600?random=18'
      ]
    },
    {
      id: 10,
      username: 'priya_dev',
      avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
      timeAgo: '10h',
      images: [
        'https://randomuser.me/api/portraits/women/15.jpg',
        'https://picsum.photos/400/600?random=19',
        'https://picsum.photos/400/600?random=20'
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

  // Navigation functions with improved logic
  const navigateToNextStory = () => {
    const hasMoreStoriesInCurrentUser = currentIndex < storyImages.length - 1;
    const hasMoreUsers = currentUserIndex < storyUsers.length - 1;

    if (hasMoreStoriesInCurrentUser) {
      // Move to next story of same user
      setCurrentIndex(prev => prev + 1);
    } else if (hasMoreUsers) {
      // Move to first story of next user
      setCurrentUserIndex(prev => prev + 1);
      setCurrentIndex(0);
    }
    // If no more stories and no more users, do nothing
  };

  const navigateToPrevStory = () => {
    const hasPrevStoriesInCurrentUser = currentIndex > 0;
    const hasPrevUsers = currentUserIndex > 0;

    if (hasPrevStoriesInCurrentUser) {
      // Move to previous story of same user
      setCurrentIndex(prev => prev - 1);
    } else if (hasPrevUsers) {
      // Move to last story of previous user
      const prevUserIndex = currentUserIndex - 1;
      const prevUser = storyUsers[prevUserIndex];
      setCurrentUserIndex(prevUserIndex);
      setCurrentIndex(prevUser.images.length - 1);
    }
    // If no previous stories and no previous users, do nothing
  };

  // Enhanced tap handler with proper event handling
  const handleStoryTap = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const containerRect = event.currentTarget.getBoundingClientRect();
    const tapX = event.clientX - containerRect.left;
    const containerWidth = containerRect.width;
    const tapPercentage = (tapX / containerWidth) * 100;

    // Left side tap (0-50% of width)
    if (tapPercentage < 50) {
      navigateToPrevStory();
    } 
    // Right side tap (50-100% of width)
    else {
      navigateToNextStory();
    }
  };

  // Touch start handler
  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
  };

  // Touch end handler with swipe detection
  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;
    const deltaTime = touchEndRef.current.time - touchStartRef.current.time;
    
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;

    // Check if it's a valid swipe (not too slow)
    if (deltaTime > maxSwipeTime) return;

    // Vertical swipe detection for closing modal
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
      // Show closing feedback
      setSwipeDirection('close');
      setTimeout(() => setSwipeDirection(null), 200);
      
      // Swipe down or up to close
      if (Math.abs(deltaY) > minSwipeDistance) {
        setTimeout(() => onClose(), 150); // Slight delay for visual feedback
        return;
      }
    }

    // Horizontal swipe detection for story navigation
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      // Small horizontal swipe - same user story navigation
      if (Math.abs(deltaX) < 120) {
        if (deltaX > 0) {
          // Right swipe - previous story (same user only)
          setSwipeDirection('prev-story');
          setTimeout(() => setSwipeDirection(null), 200);
          navigateToPrevStoryInUser();
        } else {
          // Left swipe - next story (same user only)
          setSwipeDirection('next-story');
          setTimeout(() => setSwipeDirection(null), 200);
          navigateToNextStoryInUser();
        }
      } 
      // Large horizontal swipe - cross-user navigation
      else {
        if (deltaX > 0) {
          // Right swipe - previous user
          setSwipeDirection('prev-user');
          setTimeout(() => setSwipeDirection(null), 200);
          navigateToPrevUser();
        } else {
          // Left swipe - next user
          setSwipeDirection('next-user');
          setTimeout(() => setSwipeDirection(null), 200);
          navigateToNextUser();
        }
      }
    }
  };

  // Navigation within same user only
  const navigateToNextStoryInUser = () => {
    if (currentIndex < storyImages.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const navigateToPrevStoryInUser = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Navigation to different users
  const navigateToNextUser = () => {
    if (currentUserIndex < storyUsers.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
      setCurrentIndex(0);
    }
  };

  const navigateToPrevUser = () => {
    if (currentUserIndex > 0) {
      const prevUserIndex = currentUserIndex - 1;
      const prevUser = storyUsers[prevUserIndex];
      setCurrentUserIndex(prevUserIndex);
      setCurrentIndex(prevUser.images.length - 1);
    }
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

      {/* Story Content with Enhanced Touch and Swipe Navigation */}
      <div 
        className="relative w-full h-full max-w-md mx-auto cursor-pointer"
        onClick={handleStoryTap}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ userSelect: 'none', touchAction: 'none' }}
      >
        {/* Visual tap zones for better UX - invisible overlays */}
        <div className="absolute inset-0 z-10 flex">
          {/* Left tap zone */}
          <div 
            className="w-1/2 h-full flex items-center justify-start pl-4"
            title="Previous story"
          >
            <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>
          
          {/* Right tap zone */}
          <div 
            className="w-1/2 h-full flex items-center justify-end pr-4"
            title="Next story"
          >
            <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Story image */}
        <img
          src={storyImages[currentIndex]}
          alt={`Story ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Swipe feedback overlay */}
        {swipeDirection && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 rounded-full p-4 animate-pulse">
              {swipeDirection === 'close' && (
                <div className="text-2xl">❌</div>
              )}
              {swipeDirection === 'next-story' && (
                <div className="text-2xl">➡️</div>
              )}
              {swipeDirection === 'prev-story' && (
                <div className="text-2xl">⬅️</div>
              )}
              {swipeDirection === 'next-user' && (
                <div className="text-2xl">⏭️</div>
              )}
              {swipeDirection === 'prev-user' && (
                <div className="text-2xl">⏮️</div>
              )}
            </div>
          </div>
        )}

        {/* Gesture hint overlay - appears briefly */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/60 text-xs text-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2 space-y-1">
            <div>👆 Tap left/right</div>
            <div>👈👉 Small swipe = same user</div>
            <div>👈👉 Big swipe = change user</div>
            <div>👆👇 Swipe up/down = close</div>
          </div>
        </div>
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

export default StoryViewModal;