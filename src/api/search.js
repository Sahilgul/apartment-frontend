import api from './index';

const searchAPI = {
  /**
   * Search listings with filters
   * @param {Object} params - Search parameters and filters
   * @param {string} params.q - Search query term
   * @param {string} params.city - Filter by city
   * @param {number} params.min_price - Minimum price filter
   * @param {number} params.max_price - Maximum price filter
   * @param {number} params.bedrooms - Filter by number of bedrooms
   * @param {number} params.bathrooms - Filter by number of bathrooms
   * @param {string} params.sort - Sort parameter (price_asc, price_desc, newest)
   * @param {number} params.page - Page number for pagination
   * @param {number} params.limit - Results per page
   * @returns {Promise} - API response with search results
   */
  searchListings: (params = {}) => {
    return api.get('/search/', { params });
  },
  
  /**
   * Get auto-complete suggestions for search
   * @param {string} query - Partial search query
   * @returns {Promise} - API response with suggestions
   */
  getSearchSuggestions: (query) => {
    return api.get('/search/suggestions', { 
      params: { q: query }
    });
  },
  
  /**
   * Get popular search terms
   * @returns {Promise} - API response with popular search terms
   */
  getPopularSearches: () => {
    return api.get('/search/popular');
  }
};

export default searchAPI;