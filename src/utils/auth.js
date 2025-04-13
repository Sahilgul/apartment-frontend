// Local storage keys
const TOKEN_KEY = 'apartment_platform_token';
const REFRESH_TOKEN_KEY = 'apartment_platform_refresh_token';

/**
 * Get the auth token from local storage
 * @returns {string|null} The auth token or null if not found
 */
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Set the auth token in local storage
 * @param {string} token - The auth token to store
 */
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Remove the auth token from local storage
 */
export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Get the refresh token from local storage
 * @returns {string|null} The refresh token or null if not found
 */
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Set the refresh token in local storage
 * @param {string} token - The refresh token to store
 */
export const setRefreshToken = (token) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

/**
 * Remove the refresh token from local storage
 */
export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Check if the user is authenticated
 * @returns {boolean} True if the user is authenticated
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Parse JWT token to get payload
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded payload or null if invalid
 */
export const parseToken = (token) => {
  if (!token) return null;
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Invalid token format:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if token is expired
 */
export const isTokenExpired = (token) => {
  const payload = parseToken(token);
  if (!payload) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp && payload.exp < currentTime;
};