import React, { useState, useEffect } from 'react';
import { MoreVertical, Lock, Heart, MessageCircle, Share, Plus, Search, Bell } from 'lucide-react';
import ProfileInfoCard from './ProfileInfoCard';
import StoriesSwiper from './StoriesSwiper';
import SecretStalkersContent from './SecretStalkersContent';
import NotificationToast from './NotifiactionToast';
import ProfileHeader from './ProfileHeader';
import BottomNavigation from './BottamNavigation';
import StoryViewModal from './StoryViewModal';

const OnClickFeatures = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isFollowing, setIsFollowing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [storiesSticky, setStoriesSticky] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 10);
      
      // Make stories sticky when scrolling past the profile section (around 300px)
      setStoriesSticky(currentScrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    showNotification(
      isFollowing ? '💔 Unfollowed successfully' : '💜 Following Vasu!', 
      'success'
    );
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setIsStoryModalOpen(true);
  };

  const handleAddStory = () => {
    showNotification('📸 Story creation coming soon!', 'info');
  };

  const handleUnlock = (friendId) => {
    showNotification('🎉 Secret stalker revealed!', 'success');
  };

  const handleMore = () => {
    showNotification('⚙️ More options...', 'info');
  };

  
};
export default OnClickFeatures;