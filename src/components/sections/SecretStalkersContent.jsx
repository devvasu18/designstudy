'use client';
import { useState } from 'react';
import { MoreVertical, Lock, Heart, Share, Plus, Search, Bell } from 'lucide-react';

const SecretStalkersContent = ({ onUnlock, isSticky }) => {
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: 'Divanshu Joshi',
      username: '@divanshu.joshi.5',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      type: 'Friend',
      locked: false
    },
    {
      id: 2,
      name: 'Riya Sharma',
      username: '@riya.sharma',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      type: 'Friend',
      locked: false
    },
    {
      id: 3,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
      type: 'Friend',
      locked: true
    },
    {
      id: 4,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      type: 'Secret Viewer',
      locked: true
    },
    {
      id: 5,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      type: 'Friend',
      locked: true
    },
    {
      id: 6,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      type: 'Secret Viewer',
      locked: true
    },
    {
      id: 7,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
      type: 'Friend',
      locked: true
    },
    {
      id: 8,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      type: 'Secret Viewer',
      locked: true
    },
    {
      id: 9,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
      type: 'Friend',
      locked: true
    },
    {
      id: 10,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      type: 'Secret Viewer',
      locked: true
    },
    {
      id: 11,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/men/82.jpg',
      type: 'Friend',
      locked: true
    },
    {
      id: 12,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/91.jpg',
      type: 'Secret Viewer',
      locked: true
    },
    {
      id: 13,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      type: 'Friend',
      locked: true
    },
    {
      id: 14,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
      type: 'Secret Viewer',
      locked: true
    },
    {
      id: 15,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
      type: 'Friend',
      locked: true
    }
  ]);

  const handleUnlock = (friendId) => {
    setFriends(friends.map(friend => 
      friend.id === friendId 
        ? { ...friend, locked: false, name: 'Mystery User', username: '@mystery.user' }
        : friend
    ));
    onUnlock?.(friendId);
  };

  return (
    <div className="bg-white">
      {/* Friends List */}
      <div className="space-y-0">
        {friends.map((friend) => (
          <div 
            key={friend.id} 
            className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-all duration-200 cursor-pointer border-b border-gray-50 last:border-b-0 group"
            onClick={() => friend.locked && handleUnlock(friend.id)}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className={`w-11 h-11 rounded-full overflow-hidden transition-all duration-300 ${
                  friend.locked ? 'blur-sm grayscale group-hover:blur-none group-hover:grayscale-0' : ''
                } shadow-sm`}>
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {friend.locked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full group-hover:bg-black/20 transition-colors duration-300">
                    <Lock className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform duration-200" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm group-hover:text-purple-600 transition-colors antialiased tracking-tight">
                  {friend.locked ? '🔒 Tap to unlock' : friend.name}
                </div>
                <div className="text-xs text-gray-500 leading-tight antialiased">
                  {friend.locked ? 'Hidden identity' : friend.username}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200 ${
                friend.type === 'Friend' 
                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 group-hover:scale-105' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200 group-hover:scale-105'
              }`}>
                {friend.type}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="px-4 py-3 border-t border-gray-100">
        <button className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg antialiased tracking-tight">
          <div className="flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            <span>Discover more viewers</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SecretStalkersContent;