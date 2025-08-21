"use client";
import { useState } from "react";
import ProfileInfoCard from "@/components/ProfileInfoCard";
import StoriesSwiper from "@/components/StoriesSwiper";
import SecretStalkersContent from "@/components/SecretStalkersContent";
import useScrollPosition from "@/hooks/useScrollPosition";
import { useAppContext } from "@/context/AppContext";

export default function HomePage() {
  const isStoriesSticky = useScrollPosition(50);
  const { setSelectedStory, showNotification } = useAppContext();

  const handleAddStory = () => {
    showNotification("📸 Add story feature coming soon!", "info");
  };

  const handleUnlock = (friendId) => {
    showNotification(`🎉 Secret stalker revealed!`, "success");
  };

  const handleStoryClick = (story) => {
    console.log("Story clicked:", story); // Debug log
    setSelectedStory(story);
  };

  // Test function to manually trigger story modal
  const testStoryModal = () => {
    const testStory = {
      id: 999,
      username: 'test_user',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      hasNewStory: true
    };
    console.log("Test story modal triggered:", testStory);
    setSelectedStory(testStory);
  };

  return (
    <div className="space-y-4">
      <ProfileInfoCard />
      
      {/* Test button for debugging */}
      <div className="px-4">
        <button 
          onClick={testStoryModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
        >
          Test Story Modal
        </button>
      </div>
      
      <StoriesSwiper
        isSticky={isStoriesSticky}
        onStoryClick={handleStoryClick}
        onAddStory={handleAddStory}
      />
      
      <SecretStalkersContent
        onUnlock={handleUnlock}
      />
    </div>
  );
}
