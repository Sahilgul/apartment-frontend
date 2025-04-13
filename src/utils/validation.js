import { ERROR_MESSAGES } from './constants';

/**
 * Validate required field
 * @param {string} value - Field value
 * @returns {string|null} Error message or null if valid
 */
export const validateRequired = (value) => {
  return value && value.trim() ? null : ERROR_MESSAGES.REQUIRED;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateEmail = (email) => {
  if (!email) return ERROR_MESSAGES.REQUIRED;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : ERROR_MESSAGES.INVALID_EMAIL;
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {string|null} Error message or null if valid
 */
export const validatePassword = (password) => {
  if (!password) return ERROR_MESSAGES.REQUIRED;
  
  if (password.length < 8) {
    return ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  }
  
  return null;
};

/**
 * Validate password confirmation matches password
 * @param {string} password - Original password
 * @param {string} confirmPassword - Password confirmation
 * @returns {string|null} Error message or null if valid
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) return ERROR_MESSAGES.REQUIRED;
  
  return password === confirmPassword ? null : ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH;
};

/**
 * Validate price is a positive number
 * @param {string|number} price - Price to validate
 * @returns {string|null} Error message or null if valid
 */
export const validatePrice = (price) => {
  if (price === undefined || price === null || price === '') {
    return ERROR_MESSAGES.REQUIRED;
  }
  
  const numPrice = Number(price);
  if (isNaN(numPrice) || numPrice <= 0) {
    return ERROR_MESSAGES.INVALID_PRICE;
  }
  
  return null;
};

/**
 * Validate number is positive
 * @param {string|number} value - Number to validate
 * @returns {string|null} Error message or null if valid
 */
export const validatePositiveNumber = (value) => {
  if (value === undefined || value === null || value === '') {
    return ERROR_MESSAGES.REQUIRED;
  }
  
  const numValue = Number(value);
  if (isNaN(numValue) || numValue <= 0) {
    return ERROR_MESSAGES.INVALID_NUMBER;
  }
  
  return null;
};

/**
 * Validate US ZIP code
 * @param {string} zipCode - ZIP code to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateZipCode = (zipCode) => {
  if (!zipCode) return ERROR_MESSAGES.REQUIRED;
  
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode) ? null : ERROR_MESSAGES.INVALID_ZIP;
};

/**
 * Validate form fields
 * @param {Object} values - Form values
 * @param {Object} validations - Validation functions for each field
 * @returns {Object} Object with field names as keys and error messages as values
 */
export const validateForm = (values, validations) => {
  const errors = {};
  
  Object.entries(validations).forEach(([field, validationFn]) => {
    const error = validationFn(values[field]);
    if (error) {
      errors[field] = error;
    }
  });
  
  return errors;
};

/**
 * Check if form has errors
 * @param {Object} errors - Form errors
 * @returns {boolean} True if form has errors
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

/**
 * Validate rating (1-5)
 * @param {number} rating - Rating to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateRating = (rating) => {
  if (rating === undefined || rating === null) {
    return ERROR_MESSAGES.REQUIRED;
  }
  
  const numRating = Number(rating);
  if (isNaN(numRating) || numRating < 1 || numRating > 5) {
    return 'Rating must be between 1 and 5';
  }
  
  return null;
};

/**
 * Validate login form
 * @param {Object} values - Form values
 * @returns {Object} Form errors
 */
export const validateLoginForm = (values) => {
  return validateForm(values, {
    email: validateEmail,
    password: validateRequired,
  });
};

/**
 * Validate registration form
 * @param {Object} values - Form values
 * @returns {Object} Form errors
 */
export const validateRegistrationForm = (values) => {
  const errors = validateForm(values, {
    username: validateRequired,
    email: validateEmail,
    password: validatePassword,
  });
  
  if (values.confirmPassword !== undefined) {
    const confirmError = validatePasswordMatch(values.password, values.confirmPassword);
    if (confirmError) {
      errors.confirmPassword = confirmError;
    }
  }
  
  return errors;
};

/**
 * Validate listing form
 * @param {Object} values - Form values
 * @returns {Object} Form errors
 */
export const validateListingForm = (values) => {
  return validateForm(values, {
    title: validateRequired,
    description: validateRequired,
    price: validatePrice,
    bedrooms: validatePositiveNumber,
    bathrooms: validatePositiveNumber,
    address: validateRequired,
    city: validateRequired,
    state: validateRequired,
    zip_code: validateZipCode,
  });
};

/**
 * Validate review form
 * @param {Object} values - Form values
 * @returns {Object} Form errors
 */
export const validateReviewForm = (values) => {
  return validateForm(values, {
    content: validateRequired,
    rating: validateRating,
  });
};