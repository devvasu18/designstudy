"use client";
import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Provider component
export function AppContextProvider({ children }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const openStoryModal = (story) => {
    setCurrentStory(story);
    setIsStoryModalOpen(true);
  };

  const closeStoryModal = () => {
    setIsStoryModalOpen(false);
    setCurrentStory(null);
  };

  const value = {
    selectedStory,
    setSelectedStory,
    notification,
    showNotification,
    hideNotification,
    isStoryModalOpen,
    currentStory,
    openStoryModal,
    closeStoryModal
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}
