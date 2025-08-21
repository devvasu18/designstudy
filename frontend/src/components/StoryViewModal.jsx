"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share, ArrowLeft, Volume2, VolumeX, MoreHorizontal } from 'lucide-react';

const StoryViewModal = ({ story, onClose }) => {
  // Simple debugging version
  if (!story) {
    console.log("StoryViewModal: No story provided");
    return null;
  }

  console.log("StoryViewModal: Rendering with story:", story);

  return (
    <div className="fixed inset-0 bg-black z-[99999] flex items-center justify-center" style={{ zIndex: 99999 }}>
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black/90 cursor-pointer" 
        onClick={onClose}
        aria-label="Close story"
      />
      
      {/* Simple content for testing */}
      <div className="relative z-10 bg-white p-8 rounded-lg max-w-md w-full mx-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Story Modal Working!</h2>
        <p className="mb-4">Story from: {story.username}</p>
        <p className="mb-4">Story ID: {story.id}</p>
        <button 
          onClick={onClose}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StoryViewModal;