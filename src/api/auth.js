import api from './index';

const authAPI = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.username - Username
   * @param {string} userData.email - Email address
   * @param {string} userData.password - Password
   * @param {string} userData.role - User role (tenant/landlord)
   * @returns {Promise} - API response
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    // Check if registration returns tokens immediately
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      if (response.data.refresh_token) {
        localStorage.setItem('refreshToken', response.data.refresh_token);
      }
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    return response;
  },
  
  /**
   * Login user
   * @param {Object} credentials - User login credentials
   * @param {string} credentials.email - Email address
   * @param {string} credentials.password - Password
   * @returns {Promise} - API response with tokens
   */


  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response); // Log full response
      
      // Check if token exists and log its value
      if (response.data.access_token) {
        console.log('Token found:', response.data.access_token);
        localStorage.setItem('token', response.data.access_token);
        console.log('Token after setting:', localStorage.getItem('token')); // Verify storage
      } else {
        console.warn('No token found in response:', response.data);
      }
      
      // Same for refresh token
      if (response.data.refresh_token) {
        localStorage.setItem('refreshToken', response.data.refresh_token);
        console.log('Refresh token stored:', localStorage.getItem('refreshToken'));
      }
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('User stored:', localStorage.getItem('user'));
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      // Log the error response if available
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      throw error;
    }
  },
  
  /**
   * Refresh authentication token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise} - API response with new token
   */
  refreshToken: async (refreshToken = null) => {
    // Use the provided refresh token or get it from localStorage
    const token = refreshToken || localStorage.getItem('refreshToken');
    if (!token) {
      throw new Error('No refresh token available');
    }
    
    const response = await api.post('/auth/refresh', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Update token in localStorage
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    if (response.data.refresh_token) {
      localStorage.setItem('refreshToken', response.data.refresh_token);
    }
    
    return response;
  },
  
  /**
   * Verify user account
   * @param {string} userId - User ID to verify
   * @returns {Promise} - API response
   */
  verifyUser: (userId) => {
    return api.get(`/auth/verify/${userId}`);
  },
  
  /**
   * Logout user (client-side only)
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  /**
   * Check if user is logged in
   * @returns {boolean} - True if user is logged in
   */
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Get current user token
   * @returns {string|null} - Auth token or null
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Get current user data
   * @returns {Object|null} - User data or null
   */
  getCurrentUser: () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
};

export default authAPI;