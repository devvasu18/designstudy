'use client';
import { useState } from 'react';

const StoriesSwiper = ({ onStoryClick, isSticky }) => {
  const [stories] = useState([
    { id: 2, username: 'bestfriend_sara', avatar: 'https://randomuser.me/api/portraits/women/25.jpg', hasNewStory: true },
    { id: 3, username: 'cousin_raj', avatar: 'https://randomuser.me/api/portraits/men/30.jpg', hasNewStory: false },
    { id: 4, username: 'sister_nisha', avatar: 'https://randomuser.me/api/portraits/women/40.jpg', hasNewStory: true },
    { id: 5, username: 'brother_sam', avatar: 'https://randomuser.me/api/portraits/men/50.jpg', hasNewStory: false },
    { id: 6, username: 'friend_riya', avatar: 'https://randomuser.me/api/portraits/women/60.jpg', hasNewStory: true },
  ]);

  return (
    <div className={`bg-white px-3 py-3 border-b border-gray-100 transition-all duration-300 
      ${isSticky ? 'sticky top-0 z-50 shadow-lg backdrop-blur-md bg-white/95' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800 px-1 antialiased tracking-tight">Stories</h2>
        <div className="text-xs text-purple-600 font-medium cursor-pointer hover:text-purple-800 antialiased">View all</div>
      </div>
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {stories.map((story) => (
          <button 
            key={story.id}
            onClick={() => onStoryClick?.(story)}
            className="flex flex-col items-center space-y-2 flex-shrink-0 group"
          >
            <div className={`w-16 h-16 rounded-full p-0.5 transition-all duration-300 ${
              story.hasNewStory
                ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 group-hover:scale-110 shadow-lg'
                : 'bg-gray-200 group-hover:scale-105'
            }`}>
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                <img src={story.avatar} alt={story.username} className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
            <span className="text-xs text-gray-700 truncate max-w-[60px] block group-hover:text-purple-600 antialiased tracking-tight">
              {story.username}
            </span>
          </button>
        ))}
      </div>
      
      {/* Secret Viewers Header */}
      <div className="mt-3 px-1">
        <h2 className="text-xl font-semibold text-gray-500 tracking-tight antialiased">Secret Viewers</h2>
      </div>
    </div>
  );
};

export default StoriesSwiper;
