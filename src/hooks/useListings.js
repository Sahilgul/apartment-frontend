
// import { useState, useContext, useCallback } from 'react';
// import { ListingsContext } from '../contexts/ListingsContext';
// import { AuthContext } from '../contexts/AuthContext';
// import listingsAPI from '../api/listings';  // Corrected import
// import searchAPI from '../api/search'; 

// const useListings = () => {
//   const { 
//     listings, 
//     setListings,
//     currentListing,
//     setCurrentListing,
//     amenities,
//     setAmenities, 
//     filters
//   } = useContext(ListingsContext);
  
//   const { token } = useContext(AuthContext);
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchListings = useCallback(async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await listingsAPI.getAllListings(); // Get the full response
//       console.log('API Response:', response); // For debugging
      
//       // Extract the actual listings array from the response
//       const listingsData = response.data?.items || []; // Using optional chaining and fallback
//       setListings(listingsData);
      
//       return listingsData; // Return just the listings array
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch listings');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, [setListings]);

//   // Fetch a single listing by ID
//   const fetchListingById = useCallback(async (listingId) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const data = await listingsAPI.getListingById(listingId);  // Fixed usage
//       setCurrentListing(data);
//       return data;
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch listing');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, [setCurrentListing]);

//   // Create a new listing
//   const createListing = async (listingData) => {
//     if (!token) {
//       setError('Authentication required');
//       throw new Error('Authentication required');
//     }
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       const data = await listingsAPI.createListing(listingData, token);  // Fixed usage
//       setListings(prev => [...prev, data]);
//       return data;
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to create listing');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update an existing listing
//   const updateListing = async (listingId, updateData) => {
//     if (!token) {
//       setError('Authentication required');
//       throw new Error('Authentication required');
//     }
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       const updatedListing = await listingsAPI.updateListing(listingId, updateData, token);  // Fixed usage
//       setListings(prev => 
//         prev.map(listing => 
//           listing.id === listingId ? updatedListing : listing
//         )
//       );
      
//       if (currentListing && currentListing.id === listingId) {
//         setCurrentListing(updatedListing);
//       }
      
//       return updatedListing;
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update listing');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete a listing
//   const deleteListing = async (listingId) => {
//     if (!token) {
//       setError('Authentication required');
//       throw new Error('Authentication required');
//     }
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       await listingsAPI.deleteListing(listingId, token);  // Fixed usage
//       setListings(prev => prev.filter(listing => listing.id !== listingId));
      
//       if (currentListing && currentListing.id === listingId) {
//         setCurrentListing(null);
//       }
      
//       return true;
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to delete listing');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all available amenities
//   const fetchAmenities = useCallback(async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const data = await listingsAPI.getAmenities();  // Fixed usage
//       setAmenities(data);
//       return data;
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch amenities');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, [setAmenities]);

//   // Search listings with filters
//   const searchListings = async (searchParams) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       // Combine context filters with provided search params
//       const combinedParams = { ...filters, ...searchParams };
      
//       // Clean up the params, removing empty values
//       const cleanParams = Object.entries(combinedParams)
//         .reduce((acc, [key, value]) => {
//           if (value !== '' && value !== null && value !== undefined) {
//             if (Array.isArray(value) && value.length === 0) {
//               return acc;
//             }
//             acc[key] = value;
//           }
//           return acc;
//         }, {});
      
//       const data = await searchListings(cleanParams);  // Fixed usage and added API method
//       setListings(data);
//       return data;
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to search listings');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     listings,
//     currentListing,
//     amenities,
//     fetchListings,
//     fetchListingById,
//     createListing,
//     updateListing,
//     deleteListing,
//     fetchAmenities,
//     searchListings,
//     loading,
//     error,
//     setError
//   };
// };
 
// export default useListings;


import { useState, useContext, useCallback } from 'react';
import { ListingsContext } from '../contexts/ListingsContext';
import { AuthContext } from '../contexts/AuthContext';
import listingsAPI from '../api/listings';
import searchAPI from '../api/search';

const useListings = () => {
  const { 
    listings, 
    setListings,
    currentListing,
    setCurrentListing,
    amenities,
    setAmenities, 
    filters
  } = useContext(ListingsContext);
  
  const { token } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all listings
  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await listingsAPI.getAllListings();
      const listingsData = response.data?.items || [];
      setListings(listingsData);
      return listingsData;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch listings');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setListings]);

  // Fetch single listing by ID
  const fetchListingById = useCallback(async (listingId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await listingsAPI.getListingById(listingId);
      setCurrentListing(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch listing');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setCurrentListing]);

  // Create new listing
  const createListing = useCallback(async (listingData) => {
    if (!token) {
      setError('Authentication required');
      throw new Error('Authentication required');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await listingsAPI.createListing(listingData, token);
      setListings(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create listing');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token, setListings]);

  // Update existing listing
  const updateListing = useCallback(async (listingId, updateData) => {
    if (!token) {
      setError('Authentication required');
      throw new Error('Authentication required');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await listingsAPI.updateListing(listingId, updateData, token);
      setListings(prev => 
        prev.map(listing => 
          listing.id === listingId ? response.data : listing
        )
      );
      
      if (currentListing?.id === listingId) {
        setCurrentListing(response.data);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update listing');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token, setListings, currentListing, setCurrentListing]);

  // Delete listing
  const deleteListing = useCallback(async (listingId) => {
    if (!token) {
      setError('Authentication required');
      throw new Error('Authentication required');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await listingsAPI.deleteListing(listingId, token);
      setListings(prev => prev.filter(listing => listing.id !== listingId));
      
      if (currentListing?.id === listingId) {
        setCurrentListing(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete listing');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token, setListings, currentListing, setCurrentListing]);

  // Fetch amenities
  const fetchAmenities = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await listingsAPI.getAmenities();
      setAmenities(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch amenities');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setAmenities]);

  // Search listings
  const searchListings = useCallback(async (searchParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Clean params
      const cleanParams = Object.entries(searchParams).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          if (Array.isArray(value) && value.length === 0) {
            return acc;
          }
          acc[key] = value;
        }
        return acc;
      }, {});

      const response = await searchAPI.searchListings(cleanParams);
      const listingsData = response.data?.items || response.data || [];
      setListings(listingsData);
      return listingsData;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search listings');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setListings]);

  return {
    listings,
    currentListing,
    amenities,
    fetchListings,
    fetchListingById,
    createListing,
    updateListing,
    deleteListing,
    fetchAmenities,
    searchListings,
    loading,
    error,
    setError
  };
};

export default useListings;
