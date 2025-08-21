"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

const StoriesSwiper = ({ onStoryClick, onAddStory, isSticky }) => {
  const [stories] = useState([
    { id: 1, username: 'vasudev', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', hasNewStory: false, isOwn: true },
    { id: 2, username: 'priya', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', hasNewStory: true },
    { id: 3, username: 'rahul', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', hasNewStory: false },
    { id: 4, username: 'anjali', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', hasNewStory: true },
    { id: 5, username: 'arjun', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', hasNewStory: false },
    { id: 6, username: 'kavya', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', hasNewStory: true },
  ]);

  return (
    <div className={`bg-white px-3 py-3 border-b border-gray-100 transition-all duration-300 
      ${isSticky ? 'sticky top-0 z-50 shadow-lg backdrop-blur-md bg-white/95' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800 px-1">Stories</h2>
        <div className="text-xs text-purple-600 font-medium cursor-pointer hover:text-purple-800">View all</div>
      </div>
      <div className="flex space-x-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
        {stories.map((story) => (
          <button 
            key={story.id}
            onClick={() => {
              console.log("Story button clicked:", story); // Debug log
              if (story.isOwn) {
                console.log("Own story clicked, calling onAddStory"); // Debug log
                onAddStory?.();
              } else {
                console.log("Other story clicked, calling onStoryClick"); // Debug log
                onStoryClick?.(story);
              }
            }}
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
                  <img src={story.avatar} alt={story.username} className="w-full h-full object-cover rounded-full" />
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
            <span className="text-xs text-gray-700 truncate max-w-[60px] block group-hover:text-purple-600">
              {story.isOwn ? 'Your story' : story.username}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoriesSwiper;
