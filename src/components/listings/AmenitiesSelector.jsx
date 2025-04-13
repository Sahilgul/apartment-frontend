import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AmenitiesSelector = ({ selectedAmenities = [], onChange }) => {
  const [amenities, setAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://127.0.0.1:5000/api/listings/amenities');
        setAmenities(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load amenities');
        setIsLoading(false);
        console.error('Error fetching amenities:', err);
      }
    };

    fetchAmenities();
  }, []);

  const handleChange = (amenityId) => {
    let updatedAmenities;
    
    if (selectedAmenities.includes(amenityId)) {
      updatedAmenities = selectedAmenities.filter(id => id !== amenityId);
    } else {
      updatedAmenities = [...selectedAmenities, amenityId];
    }
    
    onChange(updatedAmenities);
  };

  if (isLoading) return <div className="text-center py-4">Loading amenities...</div>;
  if (error) return <div className="text-red-500 py-2">{error}</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
      {amenities.map((amenity) => (
        <div key={amenity.id} className="flex items-center">
          <input
            type="checkbox"
            id={`amenity-${amenity.id}`}
            checked={selectedAmenities.includes(amenity.id)}
            onChange={() => handleChange(amenity.id)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2 h-4 w-4"
          />
          <label htmlFor={`amenity-${amenity.id}`} className="text-gray-700">
            {amenity.name}
          </label>
        </div>
      ))}
    </div>
  );
};

AmenitiesSelector.propTypes = {
  selectedAmenities: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default AmenitiesSelector;