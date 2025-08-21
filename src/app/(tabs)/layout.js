"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useScrollPosition from "@/hooks/useScrollPosition";
import { AppContextProvider, useAppContext } from "@/context/AppContext";

// shared UI components
import BottomNavigation from "@/components/ui/BottomNavigation";
import NotificationToast from "@/components/ui/NotificationToast";
import StoryViewModalSimple from "@/components/features/stories/StoryViewModalSimple";
import DisablePinchZoom from "@/components/ui/DisablePinchZoom";

function TabsLayoutContent({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHeaderScrolled = useScrollPosition(50);
  const { selectedStory, setSelectedStory, notification, hideNotification } = useAppContext();

  // Debug log to track selectedStory changes
  React.useEffect(() => {
    console.log("Layout selectedStory changed:", selectedStory);
  }, [selectedStory]);

  // Extract active tab from pathname
  const getActiveTab = () => {
    if (pathname.includes('/home')) return 'home';
    if (pathname.includes('/stats')) return 'stats';
    if (pathname.includes('/profile')) return 'profile';
    if (pathname.includes('/discover')) return 'discover';
    return 'home'; // default
  };

  const handleTabChange = (tab) => {
    router.push(`/${tab}`);
  };

  return (
    <>
      <DisablePinchZoom />
      <div 
        className="min-h-screen"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          paddingBottom: selectedStory ? '0px' : '80px', // Remove extra padding when story is open
          boxSizing: 'border-box'
        }}
      >
        {/* Main content area */}
        <main 
          className="min-h-[calc(100vh-160px)]"
          style={{
            paddingBottom: '24px',
            marginBottom: selectedStory ? '0px' : '80px', // Remove margin when story is open
            position: 'relative',
            zIndex: 1
          }}
        > 
          {children}
        </main>
      </div>

      {/* Bottom Navigation - Hide when story modal is open */}
      {!selectedStory && (
        <BottomNavigation 
          activeTab={getActiveTab()} 
          setActiveTab={handleTabChange} 
        />
      )}
      
      {/* Story Modal */}
      {selectedStory && (
        <StoryViewModalSimple 
          story={selectedStory} 
          onClose={() => setSelectedStory(null)} 
        />
      )}
      
      {/* Notification Toast */}
      {notification && (
        <NotificationToast 
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </>
  );
}

export default function TabsLayout({ children }) {
  return (
    <AppContextProvider>
      <TabsLayoutContent>{children}</TabsLayoutContent>
    </AppContextProvider>
  );
}
