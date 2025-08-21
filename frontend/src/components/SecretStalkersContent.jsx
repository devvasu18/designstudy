'use client';
import { useState } from 'react';
import { MoreVertical, Lock, Heart, MessageCircle, Share, Plus, Search, Bell } from 'lucide-react';

const SecretStalkersContent = ({ onUnlock }) => {
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: 'Divanshu Joshi',
      username: '@divanshu.joshi.5',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      type: 'Friend',
      locked: false,
      lastSeen: '2 hours ago'
    },
    {
      id: 2,
      name: 'Riya Sharma',
      username: '@riya.sharma',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      type: 'Friend',
      locked: false,
      lastSeen: '1 day ago'
    },
    {
      id: 3,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
      type: 'Secret Viewer',
      locked: true,
      lastSeen: 'Recently'
    },
    {
      id: 4,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      type: 'Secret Viewer',
      locked: true,
      lastSeen: 'Recently'
    },
    {
      id: 5,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      type: 'Secret Viewer',
      locked: true,
      lastSeen: 'Recently'
    },
    {
      id: 6,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      type: 'Secret Viewer',
      locked: true,
      lastSeen: 'Recently'
    },
    {
      id: 7,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
      type: 'Secret Viewer',
      locked: true,
      lastSeen: 'Recently'
    },
    {
      id: 8,
      name: 'Secret Viewer',
      username: 'Tap to unlock',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      type: 'Secret Viewer',
      locked: true,
      lastSeen: 'Recently'
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
      {/* Section Header */}
      <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Secret Viewers</h2>
            <p className="text-sm text-gray-600 mt-1">Who's been checking your profile</p>
          </div>
          <div className="text-2xl">🕵️</div>
        </div>
      </div>
      
      {/* Friends List */}
      <div className="space-y-1">
        {friends.map((friend) => (
          <div 
            key={friend.id} 
            className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer border-b border-gray-50 last:border-b-0 group"
            onClick={() => friend.locked && handleUnlock(friend.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className={`w-14 h-14 rounded-full overflow-hidden transition-all duration-300 ${
                  friend.locked ? 'blur-sm grayscale group-hover:blur-none group-hover:grayscale-0' : ''
                } shadow-md`}>
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {friend.locked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full group-hover:bg-black/20 transition-colors duration-300">
                    <Lock className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-base group-hover:text-purple-600 transition-colors">
                  {friend.locked ? '🔒 Tap to unlock' : friend.name}
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  {friend.locked ? 'Hidden identity' : friend.username}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    friend.locked ? 'bg-orange-400 animate-pulse' : 'bg-green-400'
                  }`}></div>
                  <span className="text-xs text-gray-400">
                    {friend.locked ? 'Recently active' : `Active ${friend.lastSeen}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                friend.type === 'Friend' 
                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 group-hover:scale-105' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200 group-hover:scale-105'
              }`}>
                {friend.type}
              </div>
              {!friend.locked && (
                <button className="p-2 bg-gray-100 rounded-full hover:bg-purple-100 hover:text-purple-600 transition-all duration-200 hover:scale-110">
                  <MessageCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="px-4 py-6 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-purple-50">
        <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
          <div className="flex items-center justify-center gap-2">
            <span>🔍</span>
            <span>Discover more secret viewers</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SecretStalkersContent;