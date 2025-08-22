import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function PremiumSubscription({ onClose }) {
  const { isDarkMode } = useAppContext();

  return (
    <div className={`fixed inset-0 z-[9999] transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`h-screen w-full max-w-md mx-auto relative transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        {/* Close Button */}
        <div className="absolute top-8 right-4 z-10">
          <button 
            onClick={onClose}
            className={`w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : 'bg-white hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          <h1 className={`text-2xl font-bold text-center mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Premium Features
          </h1>
          
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Advanced Analytics</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Unlimited Stories</span>
            </div>
          </div>
          
          <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
}
