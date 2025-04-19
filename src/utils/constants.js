// States (continued)
export const US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];
  
  // Price Ranges (for filtering)
  export const PRICE_RANGES = [
    { min: 0, max: 1000, label: 'Under $1,000' },
    { min: 1000, max: 1500, label: '$1,000 - $1,500' },
    { min: 1500, max: 2000, label: '$1,500 - $2,000' },
    { min: 2000, max: 2500, label: '$2,000 - $2,500' },
    { min: 2500, max: 3000, label: '$2,500 - $3,000' },
    { min: 3000, max: 3500, label: '$3,000 - $3,500' },
    { min: 3500, max: 4000, label: '$3,500 - $4,000' },
    { min: 4000, max: null, label: '$4,000+' }
  ];
  
  // Bedroom Options
  export const BEDROOM_OPTIONS = [
    { value: 'studio', label: 'Studio' },
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4', label: '4 Bedrooms' },
    { value: '5+', label: '5+ Bedrooms' }
  ];
  
  // Bathroom Options
  export const BATHROOM_OPTIONS = [
    { value: '1', label: '1 Bathroom' },
    { value: '1.5', label: '1.5 Bathrooms' },
    { value: '2', label: '2 Bathrooms' },
    { value: '2.5', label: '2.5 Bathrooms' },
    { value: '3', label: '3 Bathrooms' },
    { value: '3.5+', label: '3.5+ Bathrooms' }
  ];
  
  // Routes
  export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    LISTINGS: '/listings',
    LISTING_DETAIL: '/listings/:id',
    CREATE_LISTING: '/listings/create',
    EDIT_LISTING: '/listings/:id/edit',
    CREATE_REVIEW: '/listings/:id/review',
    EDIT_REVIEW: '/reviews/:id/edit',
    SEARCH: '/search',
    PROFILE: '/profile',
    DASHBOARD: '/users/me/listings',
    NOT_FOUND: '/404'
  };
  
  // Error Messages
  export const ERROR_MESSAGES = {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
    INVALID_PRICE: 'Please enter a valid price',
    INVALID_NUMBER: 'Please enter a valid number',
    INVALID_ZIP: 'Please enter a valid ZIP code',
    LOGIN_FAILED: 'Login failed. Please check your credentials.',
    REGISTRATION_FAILED: 'Registration failed. Please try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    NOT_FOUND: 'Resource not found.'
  };