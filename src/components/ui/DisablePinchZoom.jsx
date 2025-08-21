'use client';
import { useEffect } from 'react';

const DisablePinchZoom = () => {
  useEffect(() => {
    // Prevent pinch-to-zoom on touch devices
    const preventZoom = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Prevent zoom on double tap
    const preventDoubleTapZoom = (e) => {
      e.preventDefault();
    };

    // Prevent zoom with keyboard shortcuts
    const preventKeyboardZoom = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
      }
    };

    // Prevent zoom with wheel + ctrl/cmd
    const preventWheelZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('touchmove', preventZoom, { passive: false });
    document.addEventListener('gesturestart', preventDoubleTapZoom, { passive: false });
    document.addEventListener('gesturechange', preventDoubleTapZoom, { passive: false });
    document.addEventListener('gestureend', preventDoubleTapZoom, { passive: false });
    document.addEventListener('keydown', preventKeyboardZoom, { passive: false });
    document.addEventListener('wheel', preventWheelZoom, { passive: false });

    // Set viewport meta tag to disable zoom
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    
    const originalContent = viewportMeta.content;
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';

    // Cleanup function
    return () => {
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('touchmove', preventZoom);
      document.removeEventListener('gesturestart', preventDoubleTapZoom);
      document.removeEventListener('gesturechange', preventDoubleTapZoom);
      document.removeEventListener('gestureend', preventDoubleTapZoom);
      document.removeEventListener('keydown', preventKeyboardZoom);
      document.removeEventListener('wheel', preventWheelZoom);
      
      // Restore original viewport content
      if (viewportMeta && originalContent) {
        viewportMeta.content = originalContent;
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default DisablePinchZoom;
