import api from './index';

const listingsAPI = {
  /**
   * Get all listings
   * @param {Object} params - Optional query parameters
   * @returns {Promise} - API response with listings
   */
  getAllListings: (params = {}) => {
    return api.get('/listings/', { params });
  },
  
  /**
   * Get a single listing by ID
   * @param {string} listingId - Listing ID
   * @returns {Promise} - API response with listing details
   */
  getListingById: (listingId) => {
    return api.get(`/listings/${listingId}`);
  },
  
  /**
   * Create a new listing
   * @param {Object} listingData - Listing data
   * @param {string} listingData.title - Listing title
   * @param {string} listingData.description - Listing description
   * @param {number} listingData.price - Monthly rent price
   * @param {number} listingData.bedrooms - Number of bedrooms
   * @param {number} listingData.bathrooms - Number of bathrooms
   * @param {string} listingData.address - Street address
   * @param {string} listingData.city - City
   * @param {string} listingData.state - State
   * @param {string} listingData.zip_code - ZIP code
   * @returns {Promise} - API response with created listing
   */
  createListing: (listingData) => {
    return api.post('/listings/', listingData);
  },
  
  /**
   * Update an existing listing
   * @param {string} listingId - Listing ID to update
   * @param {Object} updateData - Data to update
   * @returns {Promise} - API response with updated listing
   */
  updateListing: (listingId, updateData) => {
    return api.put(`/listings/${listingId}`, updateData);
  },
  
  /**
   * Delete a listing
   * @param {string} listingId - Listing ID to delete
   * @returns {Promise} - API response
   */
  deleteListing: (listingId) => {
    return api.delete(`/listings/${listingId}`);
  },
  
  /**
   * Get all available amenities
   * @returns {Promise} - API response with amenities list
   */
  getAmenities: () => {
    return api.get('/listings/amenities');
  }
};

export default listingsAPI;