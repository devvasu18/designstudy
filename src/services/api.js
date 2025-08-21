import { API_ENDPOINTS, APP_CONFIG } from '@/lib/constants';

/**
 * Base API client with common configuration
 */
class ApiClient {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || '';
    this.timeout = APP_CONFIG.API_TIMEOUT;
  }

  /**
   * Make HTTP request with timeout and error handling
   */
  async request(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      throw error;
    }
  }

  // HTTP methods
  get(endpoint, params = {}) {
    const url = new URL(`${this.baseURL}${endpoint}`, window.location.origin);
    Object.keys(params).forEach(key => 
      url.searchParams.append(key, params[key])
    );
    
    return this.request(url.pathname + url.search);
  }

  post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT', 
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

const apiClient = new ApiClient();

/**
 * User API methods
 */
export const userApi = {
  getProfile: () => apiClient.get(API_ENDPOINTS.USER),
  updateProfile: (data) => apiClient.put(API_ENDPOINTS.USER, data),
};

/**
 * Stats API methods  
 */
export const statsApi = {
  getStats: (period = 'week') => apiClient.get(API_ENDPOINTS.STATS, { period }),
};

/**
 * Stories API methods
 */
export const storiesApi = {
  getStories: () => apiClient.get(API_ENDPOINTS.STORIES),
  uploadStory: (data) => apiClient.post(API_ENDPOINTS.STORIES, data),
};

/**
 * Discover API methods
 */
export const discoverApi = {
  getUsers: (category = 'all') => apiClient.get(API_ENDPOINTS.DISCOVER, { type: 'users', category }),
  getPosts: () => apiClient.get(API_ENDPOINTS.DISCOVER, { type: 'posts' }),
};

/**
 * Combined API object for easy importing
 */
export const api = {
  user: userApi,
  stats: statsApi,
  stories: storiesApi,
  discover: discoverApi,
};

export default api;