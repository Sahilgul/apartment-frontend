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
  register: (userData) => {
    return api.post('/auth/register', userData);
  },
  
  /**
   * Login user
   * @param {Object} credentials - User login credentials
   * @param {string} credentials.email - Email address
   * @param {string} credentials.password - Password
   * @returns {Promise} - API response with tokens
   */
  login: (credentials) => {
    return api.post('/auth/login', credentials);
  },
  
  /**
   * Refresh authentication token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise} - API response with new token
   */
  refreshToken: (refreshToken) => {
    return api.post('/auth/refresh', {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });
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
  }
};

export default authAPI;