import React, { useState, useEffect } from 'react';
import { ArrowLeft, Crown, Share2, Star, HelpCircle, Shield, Moon, LogOut, MoreHorizontal } from 'lucide-react';

export default function MobileSettingsMenu({ onClose }) {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('main');

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
        alert('Premium Membership - Upgrade your account for exclusive features!');
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
    <div className={`h-screen w-full max-w-md mx-auto overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBackClick}
            className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
          >
            <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
          <h1 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>More</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
            <Star className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
          </button>
          <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
            <MoreHorizontal className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>

      {/* User Profile Section */}
      <div className={`px-4 py-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <div>
            <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Vasu</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Today at 12:41 am</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Premium Membership */}
        <button 
          onClick={() => handleMenuItemClick('premium')}
          className={`w-full flex items-center gap-4 px-4 py-4 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <Crown className="w-5 h-5 text-orange-600" />
          </div>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Premium Membership</span>
        </button>

        {/* Share with friends */}
        <button 
          onClick={() => handleMenuItemClick('share')}
          className={`w-full flex items-center gap-4 px-4 py-4 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Share2 className="w-5 h-5 text-green-600" />
          </div>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Share with friends</span>
        </button>

        {/* Rate Us */}
        <button 
          onClick={() => handleMenuItemClick('rate')}
          className={`w-full flex items-center gap-4 px-4 py-4 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-600" />
          </div>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Rate Us</span>
        </button>

        {/* Help & Support */}
        <button 
          onClick={() => handleMenuItemClick('help')}
          className={`w-full flex items-center gap-4 px-4 py-4 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-blue-600" />
          </div>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Help & Support</span>
        </button>

        {/* Privacy Policy */}
        <button 
          onClick={() => handleMenuItemClick('privacy')}
          className={`w-full flex items-center gap-4 px-4 py-4 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</span>
        </button>

        {/* Dark Mode Toggle */}
        <div className={`flex items-center justify-between px-4 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
              <Moon className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
            </div>
            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dark Mode</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className={`px-4 py-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <button 
          onClick={handleSignOut}
          className={`w-full py-3 px-4 rounded-lg border ${darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} font-medium transition-colors`}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
