'use client';
import { MoreVertical } from 'lucide-react';

const ProfileHeader = ({ onMore, isScrolled = false }) => {
  return (
    <div className={`bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-40 shadow-sm transition-all duration-300 ${
      isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
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

export default ProfileHeader;