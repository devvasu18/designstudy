import React, { useEffect } from 'react';
const NotificationToast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-6 right-6 px-6 py-4 rounded-2xl shadow-2xl z-50 transform transition-all duration-300 backdrop-blur-lg animate-slide-in ${
      type === 'success' ? 'bg-green-500/90 text-white' : 'bg-purple-500/90 text-white'
    }`}>
      <div className="flex items-center gap-3">
        <span className="text-lg">
          {type === 'success' ? '✅' : 'ℹ️'}
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