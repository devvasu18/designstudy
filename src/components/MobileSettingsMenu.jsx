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

  const handleMenuItemClick = (item) => {
    switch(item) {
      case 'premium':
        openPremiumModal();
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: 'Check out this app!',
            text: 'Amazing app I found',
            url: window.location.href
          });
        } else {
          alert('Share with friends - Link copied to clipboard!');
        }
        break;
      case 'rate':
        alert('Rate Us - Thank you for your feedback!');
        break;
      case 'help':
        alert('Help & Support - How can we assist you today?');
        break;
      case 'privacy':
        alert('Privacy Policy - Your privacy is important to us.');
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
