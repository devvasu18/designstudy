import React, { useState, useEffect } from 'react';
import { ArrowLeft, Crown, Share2, Star, HelpCircle, Shield, Moon, LogOut, MoreHorizontal } from 'lucide-react';
import PremiumSubscription from './PremiumSubscription';
import { useAppContext } from '@/context/AppContext';

export default function MobileSettingsMenu({ onClose }) {
  const [currentView, setCurrentView] = useState('main');
  const { openPremiumModal, closePremiumModal, isPremiumModalOpen, isDarkMode, toggleDarkMode } = useAppContext();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackClick = () => {
    onClose();
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Instagram Stories & Features App',
      text: 'Discover amazing Instagram stories, see who viewed your profile, and unlock premium features! 📱✨',
      url: window.location.origin || 'https://your-app-domain.com'
    };

    try {
      // Check if Web Share API is supported (mainly on mobile)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        console.log('Content shared successfully');
      } else {
        // Fallback: Copy to clipboard and show options
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        
        // Show a nice notification instead of alert
        showShareNotification();
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        // Fallback for older browsers
        fallbackShare(shareData);
      }
    }
  };

  const showShareNotification = () => {
    // Create a temporary notification element
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #4CAF50;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: system-ui;
        font-size: 14px;
        animation: slideDown 0.3s ease-out;
      ">
        📋 Link copied to clipboard! Share with your friends
      </div>
      <style>
        @keyframes slideDown {
          from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      </style>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  };

  const fallbackShare = (shareData) => {
    // For very old browsers, try to open social media sharing URLs
    const text = encodeURIComponent(`${shareData.text} ${shareData.url}`);
    const url = encodeURIComponent(shareData.url);
    
    // Create a simple sharing modal
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
            <a href="https://t.me/share/url?url=${url}&text=${encodeURIComponent(shareData.text)}" target="_blank" style="
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

  const handleHelpSupport = () => {
    const subject = encodeURIComponent('Feedback');
    const body = encodeURIComponent(`Hello InstaLker Team,\n\nI would like to provide feedback about the app.\n\nFrom: userid@12\nTo: instalker@12\n\nFeedback:\n\n\nRegards,\nUser`);
    const mailtoLink = `mailto:instalker@12?subject=${subject}&body=${body}`;
    
    // Try to open email client
    window.location.href = mailtoLink;
  };

  const handlePrivacyPolicy = () => {
    // Create privacy policy popup
    const privacyModal = document.createElement('div');
    privacyModal.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
      ">
        <div style="
          background: white;
          padding: 24px;
          border-radius: 16px;
          max-width: 400px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          font-family: system-ui;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #333; font-size: 20px;">🔒 Privacy & Security</h2>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
              background: #f5f5f5;
              border: none;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              cursor: pointer;
              font-size: 18px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='#e5e5e5'" onmouseout="this.style.backgroundColor='#f5f5f5'">×</button>
          </div>
          
          <div style="space-y: 16px;">
            <div style="margin-bottom: 16px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 20px; margin-right: 8px;">🛡️</span>
                <h3 style="margin: 0; color: #333; font-size: 16px;">Data Protection</h3>
              </div>
              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">Your Instagram data is processed securely and never stored permanently on our servers.</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 20px; margin-right: 8px;">🔐</span>
                <h3 style="margin: 0; color: #333; font-size: 16px;">Secure Login</h3>
              </div>
              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">We use Instagram's official API and OAuth for secure authentication. Your password is never shared with us.</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 20px; margin-right: 8px;">👁️</span>
                <h3 style="margin: 0; color: #333; font-size: 16px;">Profile Analytics</h3>
              </div>
              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">Story views and profile analytics are processed in real-time and not stored beyond the session.</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 20px; margin-right: 8px;">🚫</span>
                <h3 style="margin: 0; color: #333; font-size: 16px;">No Data Sharing</h3>
              </div>
              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">We never sell, share, or distribute your personal information to third parties.</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 20px; margin-right: 8px;">🔄</span>
                <h3 style="margin: 0; color: #333; font-size: 16px;">Data Control</h3>
              </div>
              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">You can request data deletion or account removal at any time through our support system.</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 20px; margin-right: 8px;">⚡</span>
                <h3 style="margin: 0; color: #333; font-size: 16px;">GDPR Compliant</h3>
              </div>
              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">Our app is fully compliant with GDPR and other international privacy regulations.</p>
            </div>
          </div>
          
          <div style="text-align: center; padding-top: 16px; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #888; font-size: 12px;">For detailed privacy policy, contact: instalker@12</p>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(privacyModal);
  };

  const handleMenuItemClick = (item) => {
    switch(item) {
      case 'premium':
        openPremiumModal();
        break;
      case 'share':
        handleShare();
        break;
      case 'rate':
        window.open('https://play.google.com/store/apps/details?id=com.app.followersfollowing', '_blank');
        break;
      case 'help':
        handleHelpSupport();
        break;
      case 'privacy':
        handlePrivacyPolicy();
        break;
      default:
        break;
    }
  };

  const handlePremiumClose = () => {
    closePremiumModal();
  };

  const handleSignOut = () => {
    const confirmed = confirm('Are you sure you want to sign out?');
    if (confirmed) {
      alert('Signed out successfully!');
      onClose();
    }
  };

  return (
    <>
    <div className={`h-screen w-full max-w-md mx-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300 sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col`}>
      {/* Fixed Header */}
      <div className={`flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 md:py-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm flex-shrink-0`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBackClick}
            className={`p-2 md:p-3 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
          >
            <ArrowLeft className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
          <h1 className={`text-lg md:text-xl lg:text-2xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>More</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className={`p-2 md:p-3 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
            <Star className={`w-4 h-4 md:w-5 md:h-5 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
          </button>
          <button className={`p-2 md:p-3 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
            <MoreHorizontal className={`w-4 h-4 md:w-5 md:h-5 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* User Profile Section */}
        <div className={`px-4 sm:px-6 md:px-8 py-6 md:py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg md:text-xl lg:text-2xl">V</span>
          </div>
          <div>
            <h2 className={`font-semibold text-base md:text-lg lg:text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Vasu</h2>
            <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Today at 12:41 am</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Premium Membership */}
        <button 
          onClick={() => handleMenuItemClick('premium')}
          className={`w-full flex items-center gap-4 md:gap-6 px-4 sm:px-6 md:px-8 py-4 md:py-5 lg:py-6 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-orange-100 flex items-center justify-center">
            <Crown className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-orange-600" />
          </div>
          <span className={`font-medium text-sm md:text-base lg:text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Premium Membership</span>
        </button>

        {/* Share with friends */}
        <button 
          onClick={() => handleMenuItemClick('share')}
          className={`w-full flex items-center gap-4 md:gap-6 px-4 sm:px-6 md:px-8 py-4 md:py-5 lg:py-6 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-green-100 flex items-center justify-center">
            <Share2 className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-green-600" />
          </div>
          <span className={`font-medium text-sm md:text-base lg:text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Share with friends</span>
        </button>

        {/* Rate Us */}
        <button 
          onClick={() => handleMenuItemClick('rate')}
          className={`w-full flex items-center gap-4 md:gap-6 px-4 sm:px-6 md:px-8 py-4 md:py-5 lg:py-6 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-yellow-100 flex items-center justify-center">
            <Star className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-yellow-600" />
          </div>
          <span className={`font-medium text-sm md:text-base lg:text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Rate Us</span>
        </button>

        {/* Help & Support */}
        <button 
          onClick={() => handleMenuItemClick('help')}
          className={`w-full flex items-center gap-4 md:gap-6 px-4 sm:px-6 md:px-8 py-4 md:py-5 lg:py-6 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-600" />
          </div>
          <span className={`font-medium text-sm md:text-base lg:text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Help & Support</span>
        </button>

        {/* Privacy Policy */}
        <button 
          onClick={() => handleMenuItemClick('privacy')}
          className={`w-full flex items-center gap-4 md:gap-6 px-4 sm:px-6 md:px-8 py-4 md:py-5 lg:py-6 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-purple-100 flex items-center justify-center">
            <Shield className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-purple-600" />
          </div>
          <span className={`font-medium text-sm md:text-base lg:text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</span>
        </button>

        {/* Dark Mode Toggle */}
        <div className={`flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 md:py-5 lg:py-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className="flex items-center gap-4 md:gap-6">
            <div className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
              <Moon className={`w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
            </div>
            <span className={`font-medium text-sm md:text-base lg:text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Dark Mode</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 md:h-7 md:w-12 lg:h-8 lg:w-14 items-center rounded-full transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <span
              className={`inline-block h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 transform rounded-full bg-white transition-transform ${
                isDarkMode ? 'translate-x-6 md:translate-x-6 lg:translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className={`px-4 sm:px-6 md:px-8 py-6 md:py-8 lg:py-10 mb-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <button 
          onClick={handleSignOut}
          className={`w-full py-3 md:py-4 lg:py-5 px-4 md:px-6 lg:px-8 rounded-lg border text-sm md:text-base lg:text-lg ${isDarkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 '} font-medium transition-colors`}
        >
          Sign Out
        </button>
      </div>
      </div>
    </div>
    
    {/* Premium Subscription Modal */}
    {isPremiumModalOpen && (
      <PremiumSubscription onClose={handlePremiumClose} />
    )}
    </>
  );
}
