"use client";
import { useAppContext } from "@/context/AppContext";
import { Home, Search, BarChart3, User } from "lucide-react";

const BottamNavigation = ({ activeTab, setActiveTab }) => {
  const { isStoryModalOpen, isDarkMode, isSettingsMenuOpen, closeSettingsMenu } = useAppContext();
  
  // Hide navigation when story modal is open
  if (isStoryModalOpen) {
    return null;
  }

  const handleTabClick = (tabId) => {
    // If settings menu is open and user clicks home, close settings menu
    if (isSettingsMenuOpen && tabId === 'home') {
      closeSettingsMenu();
    }
    setActiveTab(tabId);
  };

  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "discover", icon: Search, label: "Discover" },
    { id: "stats", icon: BarChart3, label: "Stats" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 backdrop-blur-sm px-2 py-1 z-50 shadow-lg transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800/95 border-t border-gray-700' : 'bg-white/95 border-t border-gray-100'
    }`}>
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center space-y-0.5 p-1.5 rounded-lg transition-all duration-300 ${
                activeTab === tab.id 
                  ? "text-blue-500 scale-105" 
                  : isDarkMode 
                    ? "text-gray-400 hover:text-gray-200" 
                    : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <IconComponent size={18} />
              <span className="text-xs font-medium tracking-wide">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottamNavigation;
