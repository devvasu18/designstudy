"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AppContext = createContext();

// Provider component
export function AppContextProvider({ children }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  // Load dark mode preference from localStorage on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        const isDark = savedDarkMode === 'true';
        setIsDarkMode(isDark);
        // Apply dark mode to document
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        // Check system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(systemPrefersDark);
        if (systemPrefersDark) {
          document.documentElement.classList.add('dark');
        }
      }
    }
  }, []);

  // Update localStorage and document class when dark mode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', isDarkMode.toString());
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.body.style.backgroundColor = '#1f2937'; // gray-800
      } else {
        document.documentElement.classList.remove('dark');
        document.body.style.backgroundColor = '#ffffff'; // white
      }
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  const openPremiumModal = () => {
    setIsPremiumModalOpen(true);
  };

  const closePremiumModal = () => {
    setIsPremiumModalOpen(false);
  };

  const openSettingsMenu = () => {
    setIsSettingsMenuOpen(true);
  };

  const closeSettingsMenu = () => {
    setIsSettingsMenuOpen(false);
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
    closeStoryModal,
    isPremiumModalOpen,
    openPremiumModal,
    closePremiumModal,
    isDarkMode,
    toggleDarkMode,
    isSettingsMenuOpen,
    openSettingsMenu,
    closeSettingsMenu
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
