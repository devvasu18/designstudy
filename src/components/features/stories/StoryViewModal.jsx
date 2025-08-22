import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getAllStoryUsers, getStoryById, testUserImages } from '@/data/storyData';

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

  // Debug function to validate all story data
  const validateStoryData = () => {
    console.log('===== VALIDATING ALL STORY DATA =====');
    storyUsers.forEach((user, userIndex) => {
      console.log(`User ${userIndex}: ${user.username} (ID: ${user.id})`);
      console.log(`  Avatar: ${user.avatar}`);
      console.log(`  Story Images Count: ${user.images?.length || 0}`);
      if (user.images) {
        user.images.forEach((img, imgIndex) => {
          console.log(`    Image ${imgIndex}: ${img}`);
        });
      } else {
        console.log(`  ERROR: No images array for user ${user.username}`);
      }
      console.log('---');
    });
    console.log('=====================================');
  };

  useEffect(() => {
    if (story) {
      const userIndex = storyUsers.findIndex(user => user.id === story.id);
      setCurrentUserIndex(userIndex !== -1 ? userIndex : 0);
      setCurrentIndex(0);
      setProgress(0);
      
      // Run validation on modal open
      validateStoryData();
      
      // Test the first user's images
      testUserImages();
    }
  }, [story]);

  // Auto-progression timer effect
  useEffect(() => {
    if (!isOpen) {
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
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [isOpen]);

  // Separate effect to handle progression when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      // Clear any existing interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      const currentUser = storyUsers[currentUserIndex];
      if (!currentUser) return;
      
      const currentStoryImages = currentUser.images || [];
      const hasMoreStoriesInCurrentUser = currentIndex < currentStoryImages.length - 1;
      const hasMoreUsers = currentUserIndex < storyUsers.length - 1;

      console.log('===== PROGRESSION LOGIC DEBUG =====');
      console.log('Progress complete!');
      console.log('Current Index:', currentIndex);
      console.log('Current Story Images Length:', currentStoryImages.length);
      console.log('Calculation: currentIndex < (length - 1) =', currentIndex, '<', (currentStoryImages.length - 1), '=', hasMoreStoriesInCurrentUser);
      console.log('Has more stories in user:', hasMoreStoriesInCurrentUser);
      console.log('Has more users:', hasMoreUsers);
      console.log('====================================');

      setTimeout(() => {
        if (hasMoreStoriesInCurrentUser) {
          // Move to next story in current user
          console.log('Moving to next story:', currentIndex + 1);
          setCurrentIndex(prev => prev + 1);
          setProgress(0);
        } else if (hasMoreUsers) {
          // Move to next user
          console.log('Moving to next user:', currentUserIndex + 1);
          setCurrentUserIndex(prev => prev + 1);
          setCurrentIndex(0);
          setProgress(0);
        } else {
          // End of all stories, close modal
          console.log('Closing modal - no more stories');
          if (onClose) onClose();
        }
      }, 50);
    }
  }, [progress, currentIndex, currentUserIndex, onClose]);

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

  // Debug: Log current user data whenever it changes
  useEffect(() => {
    if (currentUser) {
      console.log('===== DEBUG: Current User Data =====');
      console.log('User ID:', currentUser.id);
      console.log('User Name:', currentUser.username);
      console.log('Avatar:', currentUser.avatar);
      console.log('Story Images Array:', currentUser.images);
      console.log('Story Images Length:', currentUser.images?.length);
      console.log('Current Index:', currentIndex);
      console.log('Current Image URL:', currentUser.images?.[currentIndex]);
      console.log('All Images:', currentUser.images?.map((img, idx) => `${idx}: ${img}`));
      console.log('=====================================');
    }
  }, [currentUser, currentIndex]);  // Navigation functions with improved logic
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
          src={storyImages[currentIndex] || 'https://via.placeholder.com/400x600?text=Loading'}
          alt={`Story ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            console.error('Image failed to load:', storyImages[currentIndex]);
            e.target.src = 'https://via.placeholder.com/400x600?text=Image+Not+Found';
          }}
          onLoad={() => {
            console.log('Image loaded successfully:', storyImages[currentIndex]);
          }}
        />
      </div>
    </div>
  );
});

StoryViewModal.displayName = 'StoryViewModal';

export default StoryViewModal;