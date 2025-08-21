// Navigation tabs configuration
export const TABS = {
  HOME: 'home',
  STATS: 'stats',
  PROFILE: 'profile',
  DISCOVER: 'discover'
};

// Tab configuration for navigation
export const TAB_CONFIG = [
  {
    id: TABS.HOME,
    label: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    id: TABS.STATS,
    label: 'Stats',
    path: '/stats',
    icon: 'bar-chart'
  },
  {
    id: TABS.PROFILE,
    label: 'Profile',
    path: '/profile',
    icon: 'user'
  },
  {
    id: TABS.DISCOVER,
    label: 'Discover',
    path: '/discover',
    icon: 'search'
  }
];

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};

// API endpoints
export const API_ENDPOINTS = {
  USER: '/api/user',
  STATS: '/api/stats',
  STORIES: '/api/stories',
  DISCOVER: '/api/discover'
};

// App configuration
export const APP_CONFIG = {
  STORIES_STICKY_THRESHOLD: 50,
  HEADER_SCROLL_THRESHOLD: 50,
  NOTIFICATION_AUTO_HIDE_DELAY: 5000,
  API_TIMEOUT: 10000
};

// Mock data refresh intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  STORIES: 30000, // 30 seconds
  STATS: 300000,  // 5 minutes
  DISCOVER: 60000 // 1 minute
};