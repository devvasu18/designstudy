"use client";
import { useState } from "react";

// import tab content components
import ProfileInfoCard from "@/components/ProfileInfoCard";
import StoriesSwiper from "@/components/StoriesSwiper";
import useScrollPosition from "@/hooks/useScrollPosition";
import SecretStalkersContent from "@/components/SecretStalkersContent";
import OnClickFeatures from "@/components/OnClickFeatures";
import StatsPage from "@/components/StatsPage";
import ProfilePage from "@/components/ProfilePage";

// shared UI
import BottamNavigation from "@/components/BottamNavigation";
import NotificationToast from "@/components/NotifiactionToast";
import ProfileHeader from "@/components/ProfileHeader";
import StoryViewModal from "@/components/StoryViewModal";

//pages
import DiscoverPage from "@/components/DiscoverPage";


export default function HomePage() {
  const isStoriesSticky = useScrollPosition(150);
  const [selectedStory, setSelectedStory] = useState(null);
  const [activeTab, setActiveTab] = useState("home"); // 👈 tab state

  // content switcher
  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div>
            <ProfileInfoCard />
            <StoriesSwiper
              isSticky={isStoriesSticky}
              onStoryClick={(story) => setSelectedStory(story)}
              onAddStory={() => alert("Add a new story")}
            />
            <SecretStalkersContent
              onUnlock={(friendId) =>
                alert(`Unlocked friend with ID: ${friendId}`)
              }
            />
            <OnClickFeatures />
          </div>
        );
      case "stats":
        return <StatsPage />;
      case "profile":
        return <ProfilePage />;
      case "discover":
        return <DiscoverPage />;
      default:
        return null;
    }
  };

  return (
    <div>
      <ProfileHeader />
      {renderTabContent()}

      <BottamNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <NotificationToast />
      <StoryViewModal story={selectedStory} />
    </div>
  );
}
