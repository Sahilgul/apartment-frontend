import { createContext, useState } from 'react';

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [currentListing, setCurrentListing] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    amenities: []
  });

  // Clear error state
  const clearError = () => {
    setError(null);
  };

  // Set filters for listing search
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      city: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      amenities: []
    });
  };

  // Clear current listing selection
  const clearCurrentListing = () => {
    setCurrentListing(null);
  };

  const value = {
    listings,
    setListings,
    currentListing,
    setCurrentListing,
    clearCurrentListing,
    amenities,
    setAmenities,
    loading,
    setLoading,
    error,
    setError,
    clearError,
    filters,
    updateFilters,
    resetFilters
  };

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>;
};