import React, { useState, useEffect } from 'react';
import { ArrowLeft, Crown, Share2, Star, HelpCircle, Shield, Moon, LogOut, MoreHorizontal } from 'lucide-react';
import PremiumSubscription from './PremiumSubscription';
import { useAppContext } from '@/context/AppContext';

export default function MobileSettingsMenu({ onClose }) {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('main');
  const { openPremiumModal, closePremiumModal, isPremiumModalOpen } = useAppContext();

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
        ">
          <h3 style="margin: 0 0 16px 0; color: #333;">Share App</h3>
          <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px;">
            <a href="https://wa.me/?text=${text}" target="_blank" style="
              display: inline-block;
              padding: 8px 16px;
              background: #25D366;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-size: 12px;
            ">WhatsApp</a>
            <a href="https://t.me/share/url?url=${url}&text=${encodeURIComponent(shareData.text)}" target="_blank" style="
              display: inline-block;
              padding: 8px 16px;
              background: #0088cc;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-size: 12px;
            ">Telegram</a>
          </div>
          <button onclick="this.parentElement.parentElement.remove()" style="
            background: #f5f5f5;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
          ">Close</button>
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
            <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" style="
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
            ">×</button>
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
    <div className={`h-screen w-full max-w-md mx-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300 sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col`}>
      {/* Fixed Header */}
      <div className={`flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 md:py-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm flex-shrink-0`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBackClick}
            className={`p-2 md:p-3 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
          >
            <ArrowLeft className={`w-5 h-5 md:w-6 md:h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
          <h1 className={`text-lg md:text-xl lg:text-2xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>More</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className={`p-2 md:p-3 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
            <Star className={`w-4 h-4 md:w-5 md:h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
          </button>
          <button className={`p-2 md:p-3 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
            <MoreHorizontal className={`w-4 h-4 md:w-5 md:h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* User Profile Section */}
        <div className={`px-4 sm:px-6 md:px-8 py-6 md:py-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg md:text-xl lg:text-2xl">V</span>
          </div>
          <div>
            <h2 className={`font-semibold text-base md:text-lg lg:text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Vasu</h2>
            <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Today at 12:41 am</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Premium Membership */}
        <button 
          onClick={() => handleMenuItemClick('premium')}
          className={`w-full flex items-center gap-4 md:gap-6 px-4 sm:px-6 md:px-8 py-4 md:py-5 lg:py-6 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-orange-100 flex items-center justify-center">
            <Crown className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-orange-600" />
          </div>
          <span className={`font-medium text-sm md:text-base lg:text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Premium Membership</span>
        </button>

        {/* Share with friends */}
        <button 
          onClick={() => handleMenuItemClick('share')}
          className={`w-full flex items-center gap-4 md:gap-6 px-4 sm:px-6 md:px-8 py-4 md:py-5 lg:py-6 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-green-100 flex items-center justify-center">
            <Share2 className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-green-600" />
          </div>
          <span className={`font-medium text-sm md:text-base lg:text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Share with friends</span>
        </button>

        {/* Rate Us */}
        <button 
          onClick={() => handleMenuItemClick('rate')}
          className={`w-full flex items-center gap-4 md:gap-6 px-4 sm:px-6 md:px-8 py-4 md:py-5 lg:py-6 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-yellow-100 flex items-center justify-center">
            <Star className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-yellow-600" />
          </div>
          <span className={`font-medium text-sm md:text-base lg:text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Rate Us</span>
        </button>

        {/* Help & Support */}
        <button 
          onClick={() => handleMenuItemClick('help')}
          className={`w-full flex items-center gap-4 md:gap-6 px-4 sm:px-6 md:px-8 py-4 md:py-5 lg:py-6 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-600" />
          </div>
          <span className={`font-medium text-sm md:text-base lg:text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Help & Support</span>
        </button>

        {/* Privacy Policy */}
        <button 
          onClick={() => handleMenuItemClick('privacy')}
          className={`w-full flex items-center gap-4 md:gap-6 px-4 sm:px-6 md:px-8 py-4 md:py-5 lg:py-6 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-purple-100 flex items-center justify-center">
            <Shield className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-purple-600" />
          </div>
          <span className={`font-medium text-sm md:text-base lg:text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</span>
        </button>

        {/* Dark Mode Toggle */}
        <div className={`flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 md:py-5 lg:py-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className="flex items-center gap-4 md:gap-6">
            <div className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
              <Moon className={`w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
            </div>
            <span className={`font-medium text-sm md:text-base lg:text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dark Mode</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 md:h-7 md:w-12 lg:h-8 lg:w-14 items-center rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <span
              className={`inline-block h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6 md:translate-x-6 lg:translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className={`px-4 sm:px-6 md:px-8 py-6 md:py-8 lg:py-10 mb-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <button 
          onClick={handleSignOut}
          className={`w-full py-3 md:py-4 lg:py-5 px-4 md:px-6 lg:px-8 rounded-lg border text-sm md:text-base lg:text-lg ${darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} font-medium transition-colors`}
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
