/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} username - Username
 * @property {string} displayName - Display name
 * @property {string} avatar - Avatar URL
 * @property {number} followers - Follower count
 * @property {number} following - Following count
 * @property {boolean} isVerified - Verification status
 */

/**
 * @typedef {Object} Story
 * @property {string} id - Story ID
 * @property {string} username - Story owner username
 * @property {string} avatar - Story owner avatar
 * @property {boolean} hasNewStory - Whether story is new
 * @property {string} mediaUrl - Story media URL
 * @property {number} timestamp - Story timestamp
 */

/**
 * @typedef {Object} Notification
 * @property {string} id - Notification ID
 * @property {string} message - Notification message
 * @property {'success'|'error'|'info'|'warning'} type - Notification type
 * @property {number} timestamp - Timestamp
 * @property {boolean} isVisible - Visibility status
 */

/**
 * @typedef {Object} Tab
 * @property {string} id - Tab ID
 * @property {string} label - Tab label
 * @property {string} path - Tab path
 * @property {string} icon - Tab icon
 */

/**
 * @typedef {Object} StatsData
 * @property {number} followers - Follower count
 * @property {number} following - Following count
 * @property {number} dontFollowBack - Users who don't follow back
 * @property {number} notFollowingBack - Users not following back
 * @property {number} blockedYou - Users who blocked you
 * @property {number} blockedByYou - Users blocked by you
 * @property {number} newFollowers - New followers
 * @property {number} lostFollowers - Lost followers
 */

export {};
