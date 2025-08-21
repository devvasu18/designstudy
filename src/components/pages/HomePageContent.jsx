"use client";
import { useAppContext } from "@/context/AppContext";
import ProfileInfoCard from "@/components/features/profile/ProfileInfoCard";
import StoriesSwiper from "@/components/features/stories/StoriesSwiper";
import SecretStalkersContent from "@/components/sections/SecretStalkersContent";
import StoryModal from "@/components/modals/StoryModal";
import useScrollPosition from "@/hooks/useScrollPosition";

export default function HomePageContent() {
  const isStoriesSticky = useScrollPosition(50);
  const isSecretViewersSticky = useScrollPosition(120); // Adjust based on stories height
  const { 
    setSelectedStory, 
    showNotification, 
    isStoryModalOpen, 
    currentStory, 
    openStoryModal, 
    closeStoryModal 
  } = useAppContext();

  const handleUnlock = (friendId) => {
    showNotification(`🎉 Secret stalker revealed! Friend ID: ${friendId}`, "success");
  };

  const handleStoryClick = (story) => {
    console.log("Story clicked:", story);
    openStoryModal(story);
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

      {/* Story Modal */}
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={closeStoryModal}
        story={currentStory}
      />
    </div>
  );
}