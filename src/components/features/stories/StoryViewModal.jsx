import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share, ArrowLeft, Play, Pause } from 'lucide-react';
const StoryViewModal = ({ story, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const touchEndRef = useRef({ x: 0, y: 0, time: 0 });
  const progressIntervalRef = useRef(null);
  const storyDuration = 5000; // 5 seconds per story
  
  const storyUsers = [
    // Close friends/family stories for home page
    {
      id: 1,
      username: 'bestfriend_sara',
      avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
      timeAgo: '30m',
      images: [
        'https://randomuser.me/api/portraits/women/25.jpg',
        'https://picsum.photos/400/600?random=11',
        'https://picsum.photos/400/600?random=12'
      ]
    },
    {
      id: 2,
      username: 'cousin_raj',
      avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
      timeAgo: '1h',
      images: [
        'https://randomuser.me/api/portraits/men/30.jpg',
        'https://picsum.photos/400/600?random=13',
        'https://picsum.photos/400/600?random=14'
      ]
    },
    {
      id: 3,
      username: 'sister_nisha',
      avatar: 'https://randomuser.me/api/portraits/women/40.jpg',
      timeAgo: '2h',
      images: [
        'https://randomuser.me/api/portraits/women/40.jpg',
        'https://picsum.photos/400/600?random=15',
        'https://picsum.photos/400/600?random=16'
      ]
    },
    {
      id: 4,
      username: 'brother_sam',
      avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
      timeAgo: '3h',
      images: [
        'https://randomuser.me/api/portraits/men/50.jpg',
        'https://picsum.photos/400/600?random=17',
        'https://picsum.photos/400/600?random=18'
      ]
    },
    {
      id: 5,
      username: 'friend_riya',
      avatar: 'https://randomuser.me/api/portraits/women/60.jpg',
      timeAgo: '4h',
      images: [
        'https://randomuser.me/api/portraits/women/60.jpg',
        'https://picsum.photos/400/600?random=19',
        'https://picsum.photos/400/600?random=20'
      ]
    },
    // Discover page users (different from home)
    {
      id: 6,
      username: 'divya_holi',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      timeAgo: '1h',
      images: [
        'https://randomuser.me/api/portraits/women/44.jpg',
        'https://picsum.photos/400/600?random=21',
        'https://picsum.photos/400/600?random=22'
      ]
    },
    {
      id: 7,
      username: 'tejasvini',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      timeAgo: '2h',
      images: [
        'https://randomuser.me/api/portraits/men/22.jpg',
        'https://picsum.photos/400/600?random=23',
        'https://picsum.photos/400/600?random=24'
      ]
    },
    {
      id: 8,
      username: 'maahi_upa',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
      timeAgo: '3h',
      images: [
        'https://randomuser.me/api/portraits/women/67.jpg',
        'https://picsum.photos/400/600?random=25',
        'https://picsum.photos/400/600?random=26'
      ]
    },
    {
      id: 9,
      username: 'aman_math',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timeAgo: '4h',
      images: [
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://picsum.photos/400/600?random=27',
        'https://picsum.photos/400/600?random=28'
      ]
    },
    {
      id: 10,
      username: 'hiteshgehi',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      timeAgo: '5h',
      images: [
        'https://randomuser.me/api/portraits/men/45.jpg',
        'https://picsum.photos/400/600?random=29',
        'https://picsum.photos/400/600?random=30'
      ]
    }
  ];

  useEffect(() => {
    if (story) {
      const userIndex = storyUsers.findIndex(user => user.id === story.id);
      setCurrentUserIndex(userIndex !== -1 ? userIndex : 0);
      setCurrentIndex(0);
      setProgress(0);
      setIsPlaying(true);
    }
  }, [story]);

  // Auto-progression timer effect
  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }

    const currentUser = storyUsers[currentUserIndex];
    if (!currentUser) return;
    
    const currentStoryImages = currentUser.images || [];
    if (currentStoryImages.length === 0) return;

    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (storyDuration / 100));
        
        if (newProgress >= 100) {
          // Auto advance to next story
          const hasMoreStoriesInCurrentUser = currentIndex < currentStoryImages.length - 1;
          const hasMoreUsers = currentUserIndex < storyUsers.length - 1;

          if (hasMoreStoriesInCurrentUser) {
            // Move to next story in current user
            setTimeout(() => {
              setCurrentIndex(prev => prev + 1);
              setProgress(0);
            }, 50);
            return 0;
          } else if (hasMoreUsers) {
            // Move to next user
            setTimeout(() => {
              setCurrentUserIndex(prev => prev + 1);
              setCurrentIndex(0);
              setProgress(0);
            }, 50);
            return 0;
          } else {
            // End of all stories, close modal
            if (onClose) onClose();
            return 100;
          }
        }
        return newProgress;
      });
    }, 100);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [isOpen, isPlaying, currentIndex, currentUserIndex, onClose]);

  // Reset progress when story changes (remove setTimeout conflicts)
  useEffect(() => {
    setProgress(0);
    // Clear any pending timeouts
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, [currentIndex, currentUserIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, []);

  const currentUser = storyUsers[currentUserIndex];
  const storyImages = currentUser?.images || [];

  // Navigation functions with improved logic
  const navigateToNextStory = () => {
    const hasMoreStoriesInCurrentUser = currentIndex < storyImages.length - 1;
    const hasMoreUsers = currentUserIndex < storyUsers.length - 1;

    if (hasMoreStoriesInCurrentUser) {
      // Move to next story of same user
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else if (hasMoreUsers) {
      // Move to first story of next user
      setCurrentUserIndex(prev => prev + 1);
      setCurrentIndex(0);
      setProgress(0);
    } else {
      // End of all stories, close modal
      onClose();
    }
  };

  const navigateToPrevStory = () => {
    const hasPrevStoriesInCurrentUser = currentIndex > 0;
    const hasPrevUsers = currentUserIndex > 0;

    if (hasPrevStoriesInCurrentUser) {
      // Move to previous story of same user
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    } else if (hasPrevUsers) {
      // Move to last story of previous user
      const prevUserIndex = currentUserIndex - 1;
      const prevUser = storyUsers[prevUserIndex];
      setCurrentUserIndex(prevUserIndex);
      setCurrentIndex(prevUser.images.length - 1);
      setProgress(0);
    }
    // If no previous stories and no previous users, do nothing
  };

  // Pause/Play functions
  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
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
    // Pause story on touch start (for long press)
    setIsPlaying(false);
  };

  // Touch end handler with swipe detection
  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    // Resume story on touch end
    setIsPlaying(true);

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;
    const deltaTime = touchEndRef.current.time - touchStartRef.current.time;
    
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;

    // Check if it's a valid swipe (not too slow)
    if (deltaTime > maxSwipeTime) return;

    // Vertical swipe detection for closing modal
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
      // Swipe down or up to close
      if (Math.abs(deltaY) > minSwipeDistance) {
        onClose();
        return;
      }
    }

    // Horizontal swipe detection for story navigation
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      // Small horizontal swipe - same user story navigation
      if (Math.abs(deltaX) < 120) {
        if (deltaX > 0) {
          // Right swipe - previous story (same user only)
          navigateToPrevStoryInUser();
        } else {
          // Left swipe - next story (same user only)
          navigateToNextStoryInUser();
        }
      } 
      // Large horizontal swipe - cross-user navigation
      else {
        if (deltaX > 0) {
          // Right swipe - previous user
          navigateToPrevUser();
        } else {
          // Left swipe - next user
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
            {/* Back Arrow */}
            <button 
              onClick={onClose}
              className="text-white p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
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
          
          <div className="flex items-center space-x-3">
            {/* Play/Pause Button */}
            <button 
              onClick={togglePlayPause}
              className="text-white p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="text-white p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Enhanced Progress bars with animation */}
        <div className="flex space-x-1 mt-4">
          {storyImages.map((_, index) => (
            <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-white rounded-full transition-all duration-300 ${
                  index < currentIndex ? 'w-full' : 
                  index === currentIndex ? '' : 'w-0'
                }`}
                style={index === currentIndex ? {
                  width: `${progress}%`,
                  transition: isPlaying ? 'width 0.1s linear' : 'none'
                } : {}}
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
        onMouseDown={() => setIsPlaying(false)}
        onMouseUp={() => setIsPlaying(true)}
        onMouseLeave={() => setIsPlaying(true)}
        style={{ userSelect: 'none', touchAction: 'none' }}
      >
        {/* Invisible tap zones for better UX */}
        <div className="absolute inset-0 z-10 flex">
          {/* Left tap zone */}
          <div 
            className="w-1/2 h-full"
            title="Previous story"
          >
          </div>
          
          {/* Right tap zone */}
          <div 
            className="w-1/2 h-full"
            title="Next story"
          >
          </div>
        </div>

        {/* Story image */}
        <img
          src={storyImages[currentIndex]}
          alt={`Story ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Pause indicator overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 rounded-full p-4">
              <Pause className="w-8 h-8 text-black" />
            </div>
          </div>
        )}
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