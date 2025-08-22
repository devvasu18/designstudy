'use client';
import React, { useState, useEffect, memo, useCallback } from 'react';
import { getStoriesForHomePage } from '@/data/storyData';
import { useAppContext } from '@/context/AppContext';

const StoriesSwiper = memo(({ onStoryClick, isSticky }) => {
  const { isDarkMode } = useAppContext();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Load stories from centralized data (first 5 users from the same 20)
    setStories(getStoriesForHomePage(5));
  }, []);

  const handleStoryClick = useCallback((story) => {
    onStoryClick?.(story);
  }, [onStoryClick]);

  return (
    <div className={`px-3 py-3 border-b transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-100'
    } ${isSticky ? `sticky top-0 z-50 shadow-lg backdrop-blur-md ${
      isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'
    }` : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className={`text-lg font-bold px-1 antialiased tracking-tight ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>Stories</h2>
        <div className={`text-xs font-medium cursor-pointer transition-colors antialiased ${
          isDarkMode 
            ? 'text-purple-400 hover:text-purple-300' 
            : 'text-purple-600 hover:text-purple-800'
        }`}>View all</div>
      </div>
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {stories.map((story) => (
          <button 
            key={story.id}
            onClick={() => handleStoryClick(story)}
            className="flex flex-col items-center space-y-2 flex-shrink-0 group"
          >
            <div className={`w-16 h-16 rounded-full p-0.5 transition-all duration-300 ${
              story.hasNewStory
                ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 group-hover:scale-110 shadow-lg'
                : `group-hover:scale-105 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`
            }`}>
              <div className={`relative w-full h-full rounded-full overflow-hidden p-0.5 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <img src={story.avatar} alt={story.username} className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
            <span className={`text-xs truncate max-w-[60px] block transition-colors antialiased tracking-tight ${
              isDarkMode 
                ? 'text-gray-300 group-hover:text-purple-400' 
                : 'text-gray-700 group-hover:text-purple-600'
            }`}>
              {story.username}
            </span>
          </button>
        ))}
      </div>
      
      {/* Secret Viewers Header */}
      <div className="mt-3 px-1">
        <h2 className={`text-xl font-semibold tracking-tight antialiased ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>Secret Viewers</h2>
      </div>
    </div>
  );
});

StoriesSwiper.displayName = 'StoriesSwiper';

export default StoriesSwiper;
