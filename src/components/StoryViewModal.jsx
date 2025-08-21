import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share } from 'lucide-react';
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

export default StoryViewModal;