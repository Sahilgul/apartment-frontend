import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Filters = ({ initialFilters = {}, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    city: initialFilters.city || '',
    min_price: initialFilters.min_price || '',
    max_price: initialFilters.max_price || '',
    bedrooms: initialFilters.bedrooms || '',
    bathrooms: initialFilters.bathrooms || '',
    amenities: initialFilters.amenities || []
  });
  
  const [cities, setCities] = useState([]);
  const [availableAmenities, setAvailableAmenities] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setLoading(true);
        
        // // Get list of cities from listings
        // const listingsResponse = await axios.get('http://127.0.0.1:8080/api/listings/');
        // const uniqueCities = [...new Set(listingsResponse.data.map(listing => listing.city))];
        // setCities(uniqueCities.sort());

        const listingsResponse = await axios.get('http://127.0.0.1:8080/api/listings/');
        const data = listingsResponse.data;

        // Make sure it's an array
        const listings = Array.isArray(data) ? data : data.listings || data.data || [];

        const uniqueCities = [...new Set(listings.map(listing => listing.city))];
        setCities(uniqueCities.sort());
        
        // Get available amenities
        const amenitiesResponse = await axios.get('http://127.0.0.1:8080/api/listings/amenities');
        setAvailableAmenities(amenitiesResponse.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching filter data:', err);
        setLoading(false);
      }
    };

    fetchFilterData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleAmenityChange = (amenityId) => {
    const updatedAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter(id => id !== amenityId)
      : [...filters.amenities, amenityId];
    
    setFilters({ ...filters, amenities: updatedAmenities });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(filters);
  };

  const handleReset = () => {
    setFilters({
      city: '',
      min_price: '',
      max_price: '',
      bedrooms: '',
      bathrooms: '',
      amenities: []
    });
    onApplyFilters({});
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  if (loading) {
    return <div className="text-center py-4">Loading filters...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button 
          onClick={toggleExpand}
          className="text-blue-600 text-sm hover:text-blue-800"
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {/* City Filter */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <select
              id="city"
              name="city"
              value={filters.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label htmlFor="min_price" className="block text-sm font-medium text-gray-700 mb-1">
              Min Price ($)
            </label>
            <input
              type="number"
              id="min_price"
              name="min_price"
              value={filters.min_price}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="max_price" className="block text-sm font-medium text-gray-700 mb-1">
              Max Price ($)
            </label>
            <input
              type="number"
              id="max_price"
              name="max_price"
              value={filters.max_price}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {expanded && (
          <>
            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms
                </label>
                <select
                  id="bedrooms"
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                  Bathrooms
                </label>
                <select
                  id="bathrooms"
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="1.5">1.5+</option>
                  <option value="2">2+</option>
                  <option value="2.5">2.5+</option>
                  <option value="3">3+</option>
                </select>
              </div>
            </div>

            {/* Amenities */}
            {availableAmenities.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {availableAmenities.map(amenity => (
                    <div key={amenity.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`amenity-${amenity.id}`}
                        checked={filters.amenities.includes(amenity.id)}
                        onChange={() => handleAmenityChange(amenity.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`amenity-${amenity.id}`} className="ml-2 text-gray-700">
                        {amenity.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

Filters.propTypes = {
  initialFilters: PropTypes.object,
  onApplyFilters: PropTypes.func.isRequired
};

export default Filters;