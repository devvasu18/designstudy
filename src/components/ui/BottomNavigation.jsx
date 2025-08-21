"use client";

const BottamNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "discover", icon: "🔍", label: "Discover" },
    { id: "stats", icon: "📊", label: "Stats" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 border-t border-gray-200 px-3 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center space-y-0.5 p-2 rounded-xl transition-all duration-300 ${
              activeTab === tab.id ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottamNavigation;
