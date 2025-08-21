"use client";
import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Provider component
export function AppContextProvider({ children }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const value = {
    selectedStory,
    setSelectedStory,
    notification,
    showNotification,
    hideNotification
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
