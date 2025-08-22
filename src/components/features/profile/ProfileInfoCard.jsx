'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';
import MobileSettingsMenu from '../../MobileSettingsMenu';
import { useAppContext } from '@/context/AppContext';

const ProfileInfoCard = ({ onFollow, isFollowing }) => {
  const [showFullBio, setShowFullBio] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [animatedStats, setAnimatedStats] = useState({
    followers: 0,
    following: 0,
    posts: 0
  });
  
  const { isDarkMode, isSettingsMenuOpen, openSettingsMenu, closeSettingsMenu } = useAppContext();
  const router = useRouter();

  const finalStats = {
    followers: 398,
    following: 238,
    posts: 15
  };

  // Handler for Analyse Profile button
  const handleAnalyseProfile = () => {
    router.push('/profile');
  };

  // Handler for Share Profile button
  const handleShareProfile = async () => {
    const userId = 'userid@12'; // You can replace this with actual user ID
    const shareUrl = `https://play.google.com/store/apps/details?id=com.app.followersfollowing&referrer=${encodeURIComponent(userId)}`;
    const shareText = `Check out this amazing Instagram analytics app! 📊✨\n\nGet detailed insights about your followers, track unfollowers, and analyze your profile performance.\n\nDownload now: ${shareUrl}`;

    try {
      // Try to use native share API if available
      if (navigator.share && navigator.canShare && navigator.canShare({
        title: 'Instagram Analytics App',
        text: shareText,
        url: shareUrl,
      })) {
        await navigator.share({
          title: 'Instagram Analytics App',
          text: shareText,
          url: shareUrl,
        });
      } else {
        // Fallback: Show social media sharing modal
        showSocialShareModal(shareText, shareUrl);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        // Fallback: Show social media sharing modal
        showSocialShareModal(shareText, shareUrl);
      }
    }
  };

  const showSocialShareModal = (shareText, shareUrl) => {
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(shareUrl);
    
    // Create social media sharing modal
    const shareModal = document.createElement('div');
    shareModal.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      ">
        <div style="
          background: white;
          padding: 24px;
          border-radius: 12px;
          max-width: 300px;
          width: 90%;
          text-align: center;
          font-family: system-ui;
          position: relative;
        ">
          <button onclick="this.parentElement.parentElement.remove()" style="
            position: absolute;
            top: 12px;
            right: 12px;
            background: #f5f5f5;
            border: none;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            color: #666;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
          " onmouseover="this.style.backgroundColor='#e5e5e5'" onmouseout="this.style.backgroundColor='#f5f5f5'">×</button>
          <h3 style="margin: 0 0 20px 0; color: #333;">Share App</h3>
          <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
            <a href="https://wa.me/?text=${text}" target="_blank" style="
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 12px;
              background: #25D366;
              color: white;
              text-decoration: none;
              border-radius: 12px;
              width: 60px;
              height: 60px;
              justify-content: center;
              transition: transform 0.2s;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
              </svg>
            </a>
            <a href="https://t.me/share/url?url=${url}&text=${encodeURIComponent('Check out this amazing Instagram analytics app! 📊✨')}" target="_blank" style="
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 12px;
              background: #0088cc;
              color: white;
              text-decoration: none;
              border-radius: 12px;
              width: 60px;
              height: 60px;
              justify-content: center;
              transition: transform 0.2s;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" style="
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 12px;
              background: #1877F2;
              color: white;
              text-decoration: none;
              border-radius: 12px;
              width: 60px;
              height: 60px;
              justify-content: center;
              transition: transform 0.2s;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" style="
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 12px;
              background: #0A66C2;
              color: white;
              text-decoration: none;
              border-radius: 12px;
              width: 60px;
              height: 60px;
              justify-content: center;
              transition: transform 0.2s;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/sharer/sharer.php?u=${url}" target="_blank" style="
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 12px;
              background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
              color: white;
              text-decoration: none;
              border-radius: 12px;
              width: 60px;
              height: 60px;
              justify-content: center;
              transition: transform 0.2s;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(shareModal);
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
                onClick={() => openSettingsMenu()}
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
          <button 
            onClick={handleAnalyseProfile}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg tracking-wide"
          >
            Analyse Profile
          </button>
          <button 
            onClick={handleShareProfile}
            className={`flex-1 text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg border tracking-wide ${
              isDarkMode 
                ? 'bg-gray-700/70 hover:bg-gray-600 text-gray-200 border-gray-600' 
                : 'bg-white/70 hover:bg-white text-gray-700 border-gray-200'
            }`}
          >
            Share Profile
          </button>
        </div>
      </div>

      {/* Settings Menu Modal */}
      {isSettingsMenuOpen && (
        <div className={`fixed top-0 left-0 right-0 z-[9999] overflow-hidden transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`} style={{ bottom: '-20px' }}>
          <MobileSettingsMenu onClose={() => closeSettingsMenu()} />
        </div>
      )}
    </div>
  );
};

export default ProfileInfoCard;
