// Centralized story data for the entire app
// This file contains 20 dummy users that are shared across:
// - Home page (first 5 users)
// - Discover page (all 20 users)
// - Story modal (unified experience for both pages)

// Static image paths for faster loading
const getStaticAvatarPath = (id) => `/images/avatars/user${id}.jpg`;
const getStaticStoryPath = (userId, storyIndex) => `/images/stories/user${userId}_story${storyIndex}.jpg`;

// Fallback to external images if static images don't exist
const getFallbackAvatar = (id) => `https://randomuser.me/api/portraits/${id % 2 === 0 ? 'men' : 'women'}/${20 + id}.jpg`;
const getFallbackStory = (userId, storyIndex) => `https://picsum.photos/300/500?random=${userId * 10 + storyIndex}&blur=0`;

// Helper function to create image array with static-first approach
const createImageArray = (userId) => {
  return [
    getStaticAvatarPath(userId), // Try static avatar first
    getStaticStoryPath(userId, 1), // Try static story 1
    getStaticStoryPath(userId, 2), // Try static story 2
  ];
};

// Fallback image array for when static images don't exist
const createFallbackImageArray = (userId) => {
  return [
    getFallbackAvatar(userId),
    getFallbackStory(userId, 1),
    getFallbackStory(userId, 2),
  ];
};

// Main story users data (20 dummy users)
export const storyUsers = [
  {
    id: 1,
    username: 'divya_holi',
    avatar: getStaticAvatarPath(1),
    timeAgo: '30m',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(1),
    fallbackImages: createFallbackImageArray(1)
  },
  {
    id: 2,
    username: 'tejasvini',
    avatar: getStaticAvatarPath(2),
    timeAgo: '1h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(2),
    fallbackImages: createFallbackImageArray(2)
  },
  {
    id: 3,
    username: 'maahi_upa',
    avatar: getStaticAvatarPath(3),
    timeAgo: '1h',
    hasNewStory: true,
    isVerified: false,
    images: createImageArray(3),
    fallbackImages: createFallbackImageArray(3)
  },
  {
    id: 4,
    username: 'aman_math',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    timeAgo: '2h',
    hasNewStory: true,
    isVerified: false,
    images: [
      'https://randomuser.me/api/portraits/men/32.jpg',
      'https://picsum.photos/400/600?random=41',
      'https://picsum.photos/400/600?random=42'
    ]
  },
  {
    id: 5,
    username: 'hiteshgehi',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    timeAgo: '2h',
    hasNewStory: true,
    isVerified: false,
    images: [
      'https://randomuser.me/api/portraits/men/45.jpg',
      'https://picsum.photos/400/600?random=51',
      'https://picsum.photos/400/600?random=52'
    ]
  },
  {
    id: 6,
    username: 'rumit.meht',
    avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
    timeAgo: '3h',
    hasNewStory: true,
    isVerified: false,
    images: [
      'https://randomuser.me/api/portraits/men/28.jpg',
      'https://picsum.photos/400/600?random=61',
      'https://picsum.photos/400/600?random=62'
    ]
  },
  {
    id: 7,
    username: 'dilipksola',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    timeAgo: '3h',
    hasNewStory: true,
    isVerified: false,
    images: [
      'https://randomuser.me/api/portraits/women/33.jpg',
      'https://picsum.photos/400/600?random=71',
      'https://picsum.photos/400/600?random=72'
    ]
  },
  {
    id: 8,
    username: 'rajveer948',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    timeAgo: '4h',
    hasNewStory: true,
    isVerified: false,
    images: [
      'https://randomuser.me/api/portraits/men/41.jpg',
      'https://picsum.photos/400/600?random=81',
      'https://picsum.photos/400/600?random=82'
    ]
  },
  {
    id: 9,
    username: 'sharma_mon',
    avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
    timeAgo: '4h',
    hasNewStory: true,
    isVerified: false,
    images: [
      'https://randomuser.me/api/portraits/women/29.jpg',
      'https://picsum.photos/400/600?random=91',
      'https://picsum.photos/400/600?random=92'
    ]
  },
  {
    id: 10,
    username: 'priya_dev',
    avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
    timeAgo: '5h',
    hasNewStory: true,
    isVerified: true,
    images: [
      'https://randomuser.me/api/portraits/women/15.jpg',
      'https://picsum.photos/400/600?random=101',
      'https://picsum.photos/400/600?random=102'
    ]
  },
  {
    id: 11,
    username: 'rohit_kumar',
    avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
    timeAgo: '5h',
    hasNewStory: true,
    isVerified: false,
    images: [
      'https://randomuser.me/api/portraits/men/18.jpg',
      'https://picsum.photos/400/600?random=111',
      'https://picsum.photos/400/600?random=112'
    ]
  },
  {
    id: 12,
    username: 'sneha_art',
    avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
    timeAgo: '6h',
    hasNewStory: true,
    isVerified: true,
    images: [
      'https://randomuser.me/api/portraits/women/52.jpg',
      'https://picsum.photos/400/600?random=121',
      'https://picsum.photos/400/600?random=122'
    ]
  },
  {
    id: 13,
    username: 'vikash_23',
    avatar: 'https://randomuser.me/api/portraits/men/38.jpg',
    timeAgo: '6h',
    hasNewStory: true,
    isVerified: false,
    images: [
      'https://randomuser.me/api/portraits/men/38.jpg',
      'https://picsum.photos/400/600?random=131',
      'https://picsum.photos/400/600?random=132'
    ]
  },
  {
    id: 14,
    username: 'anjali_99',
    avatar: 'https://randomuser.me/api/portraits/women/71.jpg',
    timeAgo: '7h',
    hasNewStory: true,
    isVerified: false,
    images: [
      'https://randomuser.me/api/portraits/women/71.jpg',
      'https://picsum.photos/400/600?random=141',
      'https://picsum.photos/400/600?random=142'
    ]
  },
  {
    id: 15,
    username: 'arjun_fit',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    timeAgo: '7h',
    hasNewStory: true,
    isVerified: true,
    images: [
      'https://randomuser.me/api/portraits/men/55.jpg',
      'https://picsum.photos/400/600?random=151',
      'https://picsum.photos/400/600?random=152'
    ]
  },
  {
    id: 16,
    username: 'kavya_pic',
    avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
    timeAgo: '8h',
    hasNewStory: true,
    isVerified: false,
    images: [
      'https://randomuser.me/api/portraits/women/84.jpg',
      'https://picsum.photos/400/600?random=161',
      'https://picsum.photos/400/600?random=162'
    ]
  },
  {
    id: 17,
    username: 'deepak_travel',
    avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
    timeAgo: '8h',
    hasNewStory: true,
    isVerified: false,
    images: [
      'https://randomuser.me/api/portraits/men/62.jpg',
      'https://picsum.photos/400/600?random=171',
      'https://picsum.photos/400/600?random=172'
    ]
  },
  {
    id: 18,
    username: 'riya_music',
    avatar: 'https://randomuser.me/api/portraits/women/37.jpg',
    timeAgo: '9h',
    hasNewStory: true,
    isVerified: true,
    images: [
      'https://randomuser.me/api/portraits/women/37.jpg',
      'https://picsum.photos/400/600?random=181',
      'https://picsum.photos/400/600?random=182'
    ]
  },
  {
    id: 19,
    username: 'sahil_code',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    timeAgo: '9h',
    hasNewStory: true,
    isVerified: false,
    images: [
      'https://randomuser.me/api/portraits/men/75.jpg',
      'https://picsum.photos/400/600?random=191',
      'https://picsum.photos/400/600?random=192'
    ]
  },
  {
    id: 20,
    username: 'pooja_dance',
    avatar: 'https://randomuser.me/api/portraits/women/91.jpg',
    timeAgo: '10h',
    hasNewStory: true,
    isVerified: false,
    images: [
      'https://randomuser.me/api/portraits/women/91.jpg',
      'https://picsum.photos/400/600?random=201',
      'https://picsum.photos/400/600?random=202'
    ]
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
