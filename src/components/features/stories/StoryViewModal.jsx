import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getAllStoryUsers, getStoryById } from '@/data/storyData';

const StoryViewModal = memo(({ story, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const touchEndRef = useRef({ x: 0, y: 0, time: 0 });
  const progressIntervalRef = useRef(null);
  const storyDuration = 5000; // 5 seconds per story
  
  // Get all story users from centralized data
  const storyUsers = getAllStoryUsers();

  useEffect(() => {
    if (story) {
      const userIndex = storyUsers.findIndex(user => user.id === story.id);
      setCurrentUserIndex(userIndex !== -1 ? userIndex : 0);
      setCurrentIndex(0);
      setProgress(0);
    }
  }, [story]);

  // Simple auto-progression timer with better state management
  useEffect(() => {
    if (!isOpen) return;

    const currentUser = storyUsers[currentUserIndex];
    if (!currentUser || !currentUser.images) return;

    console.log('=== STARTING TIMER ===');
    console.log('User:', currentUser.username);
    console.log('Current Image Index:', currentIndex);
    console.log('Total Images:', currentUser.images.length);
    console.log('======================');

    // Clear any existing interval immediately
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
      console.log('Cleared existing interval');
    }

    // Reset progress immediately
    setProgress(0);

    // Use a timeout to ensure the cleanup and reset happened
    const timeoutId = setTimeout(() => {
      let progressValue = 0;
      
      progressIntervalRef.current = setInterval(() => {
        progressValue += 2; // 2% every 100ms = 5 seconds total
        
        // Update progress bar
        setProgress(progressValue);
        
        // Only log every 10% to reduce spam
        if (progressValue % 10 === 0) {
          console.log('Progress updated:', progressValue + '%');
        }

        if (progressValue >= 100) {
          // Clear the interval immediately
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;

          console.log('=== STORY COMPLETE ===');
          console.log('Current Index:', currentIndex);
          console.log('Current User Index:', currentUserIndex);
          console.log('Images Length:', currentUser.images.length);
          
          // Use functional updates to avoid stale closures
          setCurrentIndex(prevIndex => {
            setCurrentUserIndex(prevUserIndex => {
              // Get fresh user data
              const currentUserData = storyUsers[prevUserIndex];
              
              if (prevIndex < currentUserData.images.length - 1) {
                console.log('Moving to next story in same user:', prevIndex + 1);
                return prevUserIndex; // Don't change user index
              } else if (prevUserIndex < storyUsers.length - 1) {
                console.log('Moving to next user:', prevUserIndex + 1);
                return prevUserIndex + 1; // Move to next user
              } else {
                console.log('All stories complete, closing modal');
                setTimeout(() => onClose?.(), 100);
                return prevUserIndex; // Keep same user index
              }
            });
            
            // Return new story index
            if (prevIndex < currentUser.images.length - 1) {
              return prevIndex + 1; // Next story in same user
            } else {
              return 0; // First story of next user
            }
          });
          
          console.log('======================');
        }
      }, 100);
    }, 100);

    // Cleanup function
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      clearTimeout(timeoutId);
    };
  }, [isOpen, currentUserIndex, currentIndex, onClose]);

  // Memoized callback functions for better performance
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

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
  const currentImageUrl = storyImages[currentIndex];

  // Debug: Log when image URL changes
  useEffect(() => {
    console.log('=== IMAGE CHANGE DEBUG ===');
    console.log('Current User Index:', currentUserIndex);
    console.log('Current User:', currentUser?.username);
    console.log('Current Image Index:', currentIndex);
    console.log('Current Image URL:', currentImageUrl);
    console.log('All Images for User:', storyImages);
    console.log('=========================');
  }, [currentUserIndex, currentIndex, currentImageUrl]);

  // Navigation functions with improved logic
  const navigateToNextStory = () => {
    console.log('Manual navigation: Next story');
    
    // Clear any existing timer
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

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
    console.log('Manual navigation: Previous story');
    
    // Clear any existing timer
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

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
                  transition: 'width 0.1s linear'
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
          key={`${currentUserIndex}-${currentIndex}`}
          src={currentImageUrl || 'https://via.placeholder.com/400x600?text=Loading'}
          alt={`Story ${currentIndex + 1} of ${currentUser?.username}`}
          className="w-full h-full object-cover"
          loading="eager"
          onError={(e) => {
            console.error('Image failed to load:', currentImageUrl);
            console.error('User:', currentUser?.username, 'Index:', currentIndex);
            e.target.src = 'https://via.placeholder.com/400x600?text=Image+Not+Found';
          }}
          onLoad={() => {
            console.log('Image loaded successfully:', currentImageUrl);
            console.log('For user:', currentUser?.username, 'Index:', currentIndex);
          }}
        />
      </div>
    </div>
  );
});

StoryViewModal.displayName = 'StoryViewModal';

export default StoryViewModal;