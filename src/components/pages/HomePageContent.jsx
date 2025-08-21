"use client";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import ProfileInfoCard from "@/components/features/profile/ProfileInfoCard";
import StoriesSwiper from "@/components/features/stories/StoriesSwiper";
import SecretStalkersContent from "@/components/sections/SecretStalkersContent";
import useScrollPosition from "@/hooks/useScrollPosition";

export default function HomePageContent() {
  const isStoriesSticky = useScrollPosition(50);
  const { setSelectedStory, showNotification } = useAppContext();

  const handleAddStory = () => {
    showNotification("📸 Add story feature coming soon!", "info");
  };

  const handleUnlock = (friendId) => {
    showNotification(`🎉 Secret stalker revealed! Friend ID: ${friendId}`, "success");
  };

  const handleStoryClick = (story) => {
    console.log("Story clicked:", story);
    setSelectedStory(story);
  };

  return (
    <div className="space-y-4">
      <ProfileInfoCard />
      
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