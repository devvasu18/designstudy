// Centralized story data for the entire app
// This file contains 20 dummy users that are shared across:
// - Home page (first 5 users)
// - Discover page (all 20 users)
// - Story modal (unified experience for both pages)

// Optimized image URLs for faster loading with multiple fallback sources
const getAvatarUrl = (id) => `https://randomuser.me/api/portraits/${id % 2 === 0 ? 'men' : 'women'}/${20 + id}.jpg`;

// Multiple fallback sources for story images
const getStoryUrl = (userId, storyIndex) => {
  // Try different image services for better reliability
  const services = [
    `https://picsum.photos/300/500?random=${userId * 10 + storyIndex}`,
    `https://source.unsplash.com/300x500/?nature,landscape&sig=${userId * 10 + storyIndex}`,
    `https://images.unsplash.com/photo-${1500000000000 + userId * 1000 + storyIndex}?w=300&h=500&fit=crop`,
    `https://via.placeholder.com/300x500/4F46E5/FFFFFF?text=Story+${storyIndex}`
  ];
  
  return services[0]; // Primary service
};

// Fallback URLs for when primary fails
const getFallbackStoryUrl = (userId, storyIndex) => {
  return `https://via.placeholder.com/300x500/${getRandomColor()}/FFFFFF?text=Story+${storyIndex}`;
};

// Generate random colors for placeholder
const getRandomColor = () => {
  const colors = ['4F46E5', '10B981', 'F59E0B', 'EF4444', '8B5CF6', '06B6D4', 'F97316'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Helper function to create image array with fallback support
const createImageArray = (userId) => {
  return [
    getAvatarUrl(userId),
    getStoryUrl(userId, 1),
    getStoryUrl(userId, 2),
  ];
};

// Helper function to create fallback image array
const createFallbackImageArray = (userId) => {
  return [
    `https://via.placeholder.com/300x500/4F46E5/FFFFFF?text=User+${userId}`,
    getFallbackStoryUrl(userId, 1),
    getFallbackStoryUrl(userId, 2),
  ];
};

// Main story users data (20 dummy users)
export const storyUsers = [
  {
    id: 1,
    username: 'divya_holi',
    avatar: getAvatarUrl(1),
    timeAgo: '30m',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(1),
    fallbackImages: createFallbackImageArray(1)
  },
  {
    id: 2,
    username: 'tejasvini',
    avatar: getAvatarUrl(2),
    timeAgo: '1h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(2),
    fallbackImages: createFallbackImageArray(2)
  },
  {
    id: 3,
    username: 'maahi_upa',
    avatar: getAvatarUrl(3),
    timeAgo: '1h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(3),
    fallbackImages: createFallbackImageArray(3)
  },
  {
    id: 4,
    username: 'aman_math',
    avatar: getAvatarUrl(4),
    timeAgo: '2h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(4),
    fallbackImages: createFallbackImageArray(4)
  },
  {
    id: 5,
    username: 'hiteshgehi',
    avatar: getAvatarUrl(5),
    timeAgo: '2h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(5),
    fallbackImages: createFallbackImageArray(5)
  },
  {
    id: 6,
    username: 'rahul_kumar',
    avatar: getAvatarUrl(6),
    timeAgo: '3h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(6),
    fallbackImages: createFallbackImageArray(6)
  },
  {
    id: 7,
    username: 'sneha_patel',
    avatar: getAvatarUrl(7),
    timeAgo: '3h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(7),
    fallbackImages: createFallbackImageArray(7)
  },
  {
    id: 8,
    username: 'amit_shah',
    avatar: getAvatarUrl(8),
    timeAgo: '4h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(8),
    fallbackImages: createFallbackImageArray(8)
  },
  {
    id: 9,
    username: 'priya_singh',
    avatar: getAvatarUrl(9),
    timeAgo: '4h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(9),
    fallbackImages: createFallbackImageArray(9)
  },
  {
    id: 10,
    username: 'karan_gupta',
    avatar: getAvatarUrl(10),
    timeAgo: '5h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(10),
    fallbackImages: createFallbackImageArray(10)
  },
  {
    id: 11,
    username: 'natasha_roy',
    avatar: getAvatarUrl(11),
    timeAgo: '5h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(11),
    fallbackImages: createFallbackImageArray(11)
  },
  {
    id: 12,
    username: 'vivek_reddy',
    avatar: getAvatarUrl(12),
    timeAgo: '6h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(12),
    fallbackImages: createFallbackImageArray(12)
  },
  {
    id: 13,
    username: 'deepika_jain',
    avatar: getAvatarUrl(13),
    timeAgo: '6h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(13),
    fallbackImages: createFallbackImageArray(13)
  },
  {
    id: 14,
    username: 'rohit_agarwal',
    avatar: getAvatarUrl(14),
    timeAgo: '7h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(14),
    fallbackImages: createFallbackImageArray(14)
  },
  {
    id: 15,
    username: 'kavya_nair',
    avatar: getAvatarUrl(15),
    timeAgo: '7h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(15),
    fallbackImages: createFallbackImageArray(15)
  },
  {
    id: 16,
    username: 'suresh_bansal',
    avatar: getAvatarUrl(16),
    timeAgo: '8h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(16),
    fallbackImages: createFallbackImageArray(16)
  },
  {
    id: 17,
    username: 'pooja_malhotra',
    avatar: getAvatarUrl(17),
    timeAgo: '8h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(17),
    fallbackImages: createFallbackImageArray(17)
  },
  {
    id: 18,
    username: 'ajay_kapoor',
    avatar: getAvatarUrl(18),
    timeAgo: '9h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(18),
    fallbackImages: createFallbackImageArray(18)
  },
  {
    id: 19,
    username: 'reena_chopra',
    avatar: getAvatarUrl(19),
    timeAgo: '9h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(19),
    fallbackImages: createFallbackImageArray(19)
  },
  {
    id: 20,
    username: 'manish_goel',
    avatar: getAvatarUrl(20),
    timeAgo: '10h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(20),
    fallbackImages: createFallbackImageArray(20)
  }
];

// Utility functions
export const getStoryById = (id) => {
  return storyUsers.find(user => user.id === id);
};

export const getStoriesForHomePage = (limit = 5) => {
  // Return first 5 users from the same 20 users for home page stories
  return storyUsers.slice(0, limit).map(user => ({
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    hasNewStory: user.hasNewStory
  }));
};

export const getStoriesForDiscoverPage = () => {
  // Return all 20 users for discover page with additional properties
  return storyUsers.map(user => ({
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    hasStory: user.hasNewStory,
    isVerified: user.isVerified
  }));
};

export const getAllStoryUsers = () => {
  return storyUsers;
};
