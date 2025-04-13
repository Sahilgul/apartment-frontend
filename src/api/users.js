import api from './index';

const usersAPI = {
  /**
   * Get current user profile
   * @returns {Promise} - API response with user data
   */
  getCurrentUser: () => {
    return api.get('/users/me');
  },
  
  /**
   * Update current user profile
   * @param {Object} userData - User data to update
   * @param {string} userData.username - Updated username
   * @param {string} userData.email - Updated email
   * @param {string} userData.phone - Updated phone number
   * @param {string} userData.bio - Updated bio
   * @returns {Promise} - API response with updated user data
   */
  updateCurrentUser: (userData) => {
    return api.put('/users/me', userData);
  },
  
  /**
   * Get listings created by the current user
   * @returns {Promise} - API response with user's listings
   */
  getUserListings: () => {
    return api.get('/users/me/listings');
  },
  
  /**
   * Upload user profile image
   * @param {File} imageFile - Image file to upload
   * @returns {Promise} - API response with image URL
   */
  uploadProfileImage: (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    return api.post('/users/me/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  /**
   * Change user password
   * @param {Object} passwordData - Password data
   * @param {string} passwordData.currentPassword - Current password
   * @param {string} passwordData.newPassword - New password
   * @returns {Promise} - API response
   */
  changePassword: (passwordData) => {
    return api.put('/users/me/password', passwordData);
  }
};

export default usersAPI;