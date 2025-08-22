'use client';
import { useState, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';
import MobileSettingsMenu from '../../MobileSettingsMenu';
import { useAppContext } from '@/context/AppContext';

const ProfileInfoCard = ({ onFollow, isFollowing }) => {
  const [showFullBio, setShowFullBio] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    followers: 0,
    following: 0,
    posts: 0
  });
  
  const { isDarkMode } = useAppContext();

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
    <div className={`pt-0 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`mx-4 rounded-3xl p-4 border shadow-md backdrop-blur-sm transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 border-gray-600' 
          : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-purple-100/50'
      }`}>
        {/* Profile Picture and Name */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 p-1 shadow-xl group-hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                {imageLoading && !imageError && (
                  <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                  </div>
                )}
                
                {!imageError ? (
                  <img
                    src="https://avatar.iran.liara.run/public/42"
                    alt="Vasu Dev Profile"
                    className={`w-full h-full object-cover rounded-full transition-opacity duration-300 ${imageLoading ? 'opacity-0 absolute inset-0' : 'opacity-100'}`}
                    onError={() => {
                      console.log('Profile image failed to load');
                      setImageError(true);
                      setImageLoading(false);
                    }}
                    onLoad={() => {
                      console.log('Profile image loaded successfully');
                      setImageLoading(false);
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-pink-500 to-orange-400 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 rounded-full ring-2 ring-white/20"></div>
              </div>
            </div>
          </div>
          
          {/* Name and Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <h1 className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Vasu Dev</h1>
              </div>
              <button 
                onClick={() => setShowSettingsMenu(true)}
                className={`p-2 rounded-full transition-colors group ${
                  isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                }`}
                aria-label="More options"
              >
                <MoreHorizontal className={`w-5 h-5 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                }`} />
              </button>
            </div>
            <p className={`text-sm mb-2 font-medium transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>@vasudev</p>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>Last updated:</span>
              <span className={`text-xs font-semibold tracking-wide transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>{new Date().toLocaleString('en-US', { 
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
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className={`text-center backdrop-blur-sm rounded-2xl p-3 transition-all duration-300 cursor-pointer group hover:shadow-md ${
            isDarkMode 
              ? 'bg-gray-700/70 hover:bg-gray-600/90' 
              : 'bg-white/70 hover:bg-white/90'
          }`}>
            <div className="text-3xl font-extrabold text-purple-500 mb-1 tracking-tight">{animatedStats.followers}</div>
            <div className={`text-xs font-semibold tracking-wide uppercase transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Followers</div>
          </div>
          <div className={`text-center backdrop-blur-sm rounded-2xl p-3 transition-all duration-300 cursor-pointer group hover:shadow-md ${
            isDarkMode 
              ? 'bg-gray-700/70 hover:bg-gray-600/90' 
              : 'bg-white/70 hover:bg-white/90'
          }`}>
            <div className="text-3xl font-extrabold text-purple-500 mb-1 tracking-tight">{animatedStats.following}</div>
            <div className={`text-xs font-semibold tracking-wide uppercase transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Following</div>
          </div>
          <div className={`text-center backdrop-blur-sm rounded-2xl p-3 transition-all duration-300 cursor-pointer group hover:shadow-md ${
            isDarkMode 
              ? 'bg-gray-700/70 hover:bg-gray-600/90' 
              : 'bg-white/70 hover:bg-white/90'
          }`}>
            <div className="text-3xl font-extrabold text-purple-500 mb-1 tracking-tight">{animatedStats.posts}</div>
            <div className={`text-xs font-semibold tracking-wide uppercase transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Posts</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg tracking-wide">
            Analyse Profile
          </button>
          <button className={`flex-1 text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg border tracking-wide ${
            isDarkMode 
              ? 'bg-gray-700/70 hover:bg-gray-600 text-gray-200 border-gray-600' 
              : 'bg-white/70 hover:bg-white text-gray-700 border-gray-200'
          }`}>
            Share Profile
          </button>
        </div>
      </div>

      {/* Settings Menu Modal */}
      {showSettingsMenu && (
        <div className="fixed inset-0 z-[9999] bg-white overflow-hidden">
          <MobileSettingsMenu onClose={() => setShowSettingsMenu(false)} />
        </div>
      )}
    </div>
  );
};

export default ProfileInfoCard;
