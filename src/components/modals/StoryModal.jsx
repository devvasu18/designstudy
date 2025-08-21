'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, MoreHorizontal, Volume2, VolumeX, Play, Pause } from 'lucide-react';

const StoryModal = ({ isOpen, onClose, story }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Demo content for each user
  const getStoryContent = (username) => {
    const contentMap = {
      priya: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=700&fit=crop&crop=face',
          duration: 4000
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=700&fit=crop',
          duration: 3500
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=700&fit=crop&crop=face',
          duration: 4000
        }
      ],
      rahul: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=700&fit=crop&crop=face',
          duration: 3000
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=700&fit=crop&crop=face',
          duration: 4000
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=700&fit=crop',
          duration: 3500
        }
      ],
      anjali: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=700&fit=crop&crop=face',
          duration: 3000
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=700&fit=crop&crop=face',
          duration: 4000
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=700&fit=crop&crop=face',
          duration: 3500
        }
      ],
      arjun: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=700&fit=crop&crop=face',
          duration: 3000
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=700&fit=crop',
          duration: 4000
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f25?w=400&h=700&fit=crop&crop=face',
          duration: 3500
        }
      ],
      kavya: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=700&fit=crop&crop=face',
          duration: 3000
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&h=700&fit=crop',
          duration: 4000
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=400&h=700&fit=crop&crop=face',
          duration: 3500
        }
      ]
    };

    return contentMap[username] || [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=700&fit=crop&crop=face',
        duration: 3000
      }
    ];
  };

  const processedContent = story ? getStoryContent(story.username) : [];

  useEffect(() => {
    if (!isOpen || !isPlaying || processedContent.length === 0) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (!processedContent[currentIndex]) return prev;
        
        const newProgress = prev + (100 / (processedContent[currentIndex].duration / 100));
        if (newProgress >= 100) {
          if (currentIndex < processedContent.length - 1) {
            setIsTransitioning(true);
            setTimeout(() => {
              setCurrentIndex(prev => prev + 1);
              setIsTransitioning(false);
            }, 100);
            return 0;
          } else {
            onClose();
            return 0;
          }
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, currentIndex, onClose, processedContent]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setProgress(0);
      setIsPlaying(true);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentIndex < processedContent.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setProgress(0);
        setIsTransitioning(false);
      }, 150);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setProgress(0);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!isOpen || !story) return null;

  const currentStory = processedContent[currentIndex];

  // Safety check - if no current story, don't render
  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]">
      <div className="relative w-full max-w-sm h-full max-h-[90vh] bg-black rounded-lg overflow-hidden">
        {/* Enhanced Progress bars with timing */}
        <div className="absolute top-2 left-2 right-2 z-20">
          {/* Progress bars */}
          <div className="flex space-x-1 mb-1">
            {processedContent.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-gray-600 bg-opacity-60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-100"
                  style={{
                    width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Timing indicator */}
          <div className="flex justify-between items-center text-xs text-white text-opacity-70">
            <span className="bg-black bg-opacity-40 px-2 py-0.5 rounded-full">
              {currentIndex + 1}/{processedContent.length}
            </span>
            <span className="bg-black bg-opacity-40 px-2 py-0.5 rounded-full">
              {Math.ceil((currentStory?.duration || 3000) * (1 - progress / 100) / 1000)}s
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center space-x-3">
            <button onClick={onClose} className="text-white hover:text-gray-300 transition-colors duration-200">
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <img
                src={story.avatar}
                alt={story.username}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <span className="text-white font-medium">{story.username}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleMute} 
              className="text-white hover:text-gray-300 transition-all duration-200 p-1 rounded-full hover:bg-white hover:bg-opacity-10"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button className="text-white hover:text-gray-300 transition-all duration-200 p-1 rounded-full hover:bg-white hover:bg-opacity-10">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative w-full h-full">
          {currentStory?.type === 'image' ? (
            <img
              src={currentStory.url}
              alt="Story content"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Image loading error:', e.target.src);
                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=700&fit=crop';
              }}
            />
          ) : (
            <video
              src={currentStory?.url}
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              loop
              onError={(e) => {
                console.error('Video loading error:', e.target.src);
              }}
            />
          )}

          {/* Navigation areas */}
          <div
            className="absolute left-0 top-0 w-1/3 h-full z-10 cursor-pointer"
            onClick={handlePrevious}
          />
          <div
            className="absolute right-0 top-0 w-1/3 h-full z-10 cursor-pointer"
            onClick={handleNext}
          />
          <div
            className="absolute inset-0 z-5 cursor-pointer"
            onMouseDown={() => setIsPlaying(false)}
            onMouseUp={() => setIsPlaying(true)}
            onTouchStart={() => setIsPlaying(false)}
            onTouchEnd={() => setIsPlaying(true)}
          />
        </div>

        {/* Play/Pause indicator */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-15">
            <div className="bg-black bg-opacity-60 rounded-full p-4 animate-pulse">
              <Play size={32} className="text-white" />
            </div>
          </div>
        )}

        {/* Story transition indicator */}
        {progress > 95 && currentIndex < processedContent.length - 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-xs animate-bounce">
              Next story loading...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryModal;
