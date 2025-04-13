/**
 * Format currency value
 * @param {number} value - Value to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  /**
   * Format date to readable format
   * @param {string|Date} date - Date to format
   * @returns {string} Formatted date string
   */
  export const formatDate = (date) => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  };
  
  /**
   * Calculate time ago from date
   * @param {string|Date} date - Date to calculate from
   * @returns {string} Time ago string (e.g., "2 days ago")
   */
  export const timeAgo = (date) => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const seconds = Math.floor((now - dateObj) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval === 1 ? '1 year ago' : `${interval} years ago`;
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1 ? '1 month ago' : `${interval} months ago`;
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1 ? '1 day ago' : `${interval} days ago`;
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
    }
    
    return 'just now';
  };
  
  /**
   * Generate a URL slug from a string
   * @param {string} str - String to convert to slug
   * @returns {string} URL-friendly slug
   */
  export const slugify = (str) => {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  /**
   * Truncate text to a specific length
   * @param {string} text - Text to truncate
   * @param {number} length - Maximum length
   * @returns {string} Truncated text
   */
  export const truncateText = (text, length = 100) => {
    if (!text || text.length <= length) return text;
    return text.slice(0, length) + '...';
  };
  
  /**
   * Calculate average rating from reviews
   * @param {Array} reviews - Array of review objects with rating property
   * @returns {number} Average rating rounded to 1 decimal place
   */
  export const calculateAverageRating = (reviews) => {
    if (!reviews || !reviews.length) return 0;
    
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    const average = sum / reviews.length;
    
    return Math.round(average * 10) / 10;
  };
  
  /**
   * Group reviews by rating
   * @param {Array} reviews - Array of review objects with rating property
   * @returns {Object} Object with ratings as keys and counts as values
   */
  export const groupReviewsByRating = (reviews) => {
    if (!reviews || !reviews.length) return {};
    
    return reviews.reduce((acc, review) => {
      const rating = review.rating;
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});
  };
  
  /**
   * Format address components into a single string
   * @param {Object} address - Object containing address components
   * @returns {string} Formatted address string
   */
  export const formatAddress = ({ address, city, state, zip_code }) => {
    const parts = [address, city, state, zip_code].filter(Boolean);
    return parts.join(', ');
  };
  
  /**
   * Extract query params from URL
   * @param {string} search - URL search string
   * @returns {Object} Object with query parameters
   */
  export const getQueryParams = (search) => {
    if (!search) return {};
    
    const searchParams = new URLSearchParams(search);
    const params = {};
    
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    
    return params;
  };
  
  /**
   * Create URL with query parameters
   * @param {string} baseUrl - Base URL
   * @param {Object} params - Query parameters
   * @returns {string} URL with query parameters
   */
  export const createUrlWithParams = (baseUrl, params) => {
    if (!params || Object.keys(params).length === 0) return baseUrl;
    
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, value);
      }
    });
    
    const queryString = searchParams.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };
  
  /**
   * Generate error message from API error response
   * @param {Object} error - Error object from API response
   * @returns {string} Error message
   */
  export const getErrorMessage = (error) => {
    if (!error) return 'An unknown error occurred';
    
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
    
    if (error.message) {
      return error.message;
    }
    
    return 'An error occurred. Please try again.';
  };