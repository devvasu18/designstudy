'use client';
import { useState, useEffect } from 'react';

const NotificationToast = ({ message, type = 'info', isVisible = false, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-6 right-6 px-6 py-4 rounded-2xl shadow-2xl z-50 transform transition-all duration-300 backdrop-blur-lg ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    } ${
      type === 'success' 
        ? 'bg-green-500/90 text-white' 
        : type === 'error'
        ? 'bg-red-500/90 text-white'
        : 'bg-purple-500/90 text-white'
    }`}>
      <div className="flex items-center gap-3">
        <span className="text-lg">
          {type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
        </span>
        <span className="font-medium">{message}</span>
        <button 
          onClick={onClose}
          className="ml-2 text-white/80 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;