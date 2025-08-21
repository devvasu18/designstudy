"use client";
import { useAppContext } from "@/context/AppContext";
import { Home, Search, BarChart3, User } from "lucide-react";

const BottamNavigation = ({ activeTab, setActiveTab }) => {
  const { isStoryModalOpen } = useAppContext();
  
  // Hide navigation when story modal is open
  if (isStoryModalOpen) {
    return null;
  }

  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "discover", icon: Search, label: "Discover" },
    { id: "stats", icon: BarChart3, label: "Stats" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-2 py-1 z-50 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center space-y-0.5 p-1.5 rounded-lg transition-all duration-300 ${
                activeTab === tab.id ? "text-blue-600 scale-105" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <IconComponent size={18} />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottamNavigation;
