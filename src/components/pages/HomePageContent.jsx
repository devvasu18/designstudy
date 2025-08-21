"use client";
import { useAppContext } from "@/context/AppContext";
import ProfileInfoCard from "@/components/features/profile/ProfileInfoCard";
import StoriesSwiper from "@/components/features/stories/StoriesSwiper";
import SecretStalkersContent from "@/components/sections/SecretStalkersContent";
import useScrollPosition from "@/hooks/useScrollPosition";

export default function HomePageContent() {
  const isStoriesSticky = useScrollPosition(50);
  const isSecretViewersSticky = useScrollPosition(120); // Adjust based on stories height
  const { 
    setSelectedStory, 
    showNotification
  } = useAppContext();

  const handleUnlock = (friendId) => {
    showNotification(`🎉 Secret stalker revealed! Friend ID: ${friendId}`, "success");
  };

  const handleStoryClick = (story) => {
    console.log("Home Story clicked:", story);
    setSelectedStory(story);
  };

  return (
    <div className="space-y-0">
      <ProfileInfoCard />
      
      <StoriesSwiper
        isSticky={isStoriesSticky}
        onStoryClick={handleStoryClick}
      />
      
      <SecretStalkersContent
        isSticky={isSecretViewersSticky}
        onUnlock={handleUnlock}
      />
    </div>
  );
}