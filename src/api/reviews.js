import api from './index';

const reviewsAPI = {
  /**
   * Create a new review
   * @param {Object} reviewData - Review data
   * @param {string} reviewData.content - Review content/text
   * @param {number} reviewData.rating - Rating (1-5)
   * @param {string} reviewData.listing_id - ID of listing being reviewed
   * @returns {Promise} - API response with created review
   */
  createReview: (reviewData) => {
    return api.post('/reviews/', reviewData);
  },
  
  /**
   * Update an existing review
   * @param {string} reviewId - Review ID to update
   * @param {Object} updateData - Data to update
   * @param {string} updateData.content - Updated review content
   * @param {number} updateData.rating - Updated rating
   * @returns {Promise} - API response with updated review
   */
  updateReview: (reviewId, updateData) => {
    return api.put(`/reviews/${reviewId}`, updateData);
  },
  
  /**
   * Delete a review
   * @param {string} reviewId - Review ID to delete
   * @returns {Promise} - API response
   */
  deleteReview: (reviewId) => {
    return api.delete(`/reviews/${reviewId}`);
  },
  
  /**
   * Get all reviews for a specific listing
   * @param {string} listingId - Listing ID
   * @returns {Promise} - API response with listing reviews
   */
  getListingReviews: (listingId) => {
    return api.get(`/reviews/listing/${listingId}`);
  },
  
  /**
   * Get reviews written by the current user
   * @returns {Promise} - API response with user's reviews
   */
  getUserReviews: () => {
    return api.get('/users/me/reviews');
  }
};

export default reviewsAPI;