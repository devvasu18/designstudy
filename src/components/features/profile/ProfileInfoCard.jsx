'use client';
import { useState, useEffect } from 'react';

const ProfileInfoCard = ({ onFollow, isFollowing }) => {
  const [showFullBio, setShowFullBio] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    followers: 0,
    following: 0,
    posts: 0
  });

  const finalStats = {
    followers: 398,
    following: 238,
    posts: 15
  };

  // Animate numbers on component mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(finalStats).forEach(key => {
      let current = 0;
      const target = finalStats[key];
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        setAnimatedStats(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, stepDuration);
    });
  }, []);
  
  return (
    <div className="bg-white pt-0">
      <div className="mx-4 mb-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-3xl p-4 border border-purple-100/50 shadow-md backdrop-blur-sm">
        {/* Profile Picture and Name */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 p-1 shadow-xl group-hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 rounded-full ring-2 ring-white/20"></div>
              </div>
            </div>
          </div>
          
          {/* Name and Info */}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Vasu Dev</h1>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500">Last updated:</span>
              <span className="text-xs font-medium text-gray-600">{new Date().toLocaleString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                day: '2-digit', 
                month: 'short',
                hour12: true 
              })}</span>
            </div>
          </div>
        </div>

        {/* Clean Stats */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-3 hover:bg-white/90 transition-all duration-300 cursor-pointer group hover:shadow-md">
            <div className="text-3xl font-bold text-purple-500 mb-1">{animatedStats.followers}</div>
            <div className="text-xs text-gray-600 font-medium">Followers</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-3 hover:bg-white/90 transition-all duration-300 cursor-pointer group hover:shadow-md">
            <div className="text-3xl font-bold text-purple-500 mb-1">{animatedStats.following}</div>
            <div className="text-xs text-gray-600 font-medium">Following</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-3 hover:bg-white/90 transition-all duration-300 cursor-pointer group hover:shadow-md">
            <div className="text-3xl font-bold text-purple-500 mb-1">{animatedStats.posts}</div>
            <div className="text-xs text-gray-600 font-medium">Posts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
