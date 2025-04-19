// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import AmenitiesSelector from './AmenitiesSelector';
// import axios from 'axios';

// const ListingForm = ({ initialData, isEditing = false }) => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     bedrooms: '',
//     bathrooms: '',
//     address: '',
//     city: '',
//     state: '',
//     zip_code: '',
//     amenities: []
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         title: initialData.title || '',
//         description: initialData.description || '',
//         price: initialData.price || '',
//         bedrooms: initialData.bedrooms || '',
//         bathrooms: initialData.bathrooms || '',
//         address: initialData.address || '',
//         city: initialData.city || '',
//         state: initialData.state || '',
//         zip_code: initialData.zip_code || '',
//         amenities: initialData.amenities?.map(a => a.id) || []
//       });
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' 
//         ? Number(value) || '' 
//         : value
//     }));
//   };

//   const handleAmenitiesChange = (selectedAmenities) => {
//     setFormData(prev => ({
//       ...prev,
//       amenities: selectedAmenities
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         setError('You must be logged in to create or edit a listing');
//         setLoading(false);
//         return;
//       }

//       const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       };

//       let response;
      
//       if (isEditing) {
//         response = await axios.put(
//           `http://127.0.0.1:8080/api/listings/${initialData.id}`,
//           formData,
//           { headers }
//         );
//       } else {
//         response = await axios.post(
//           'http://127.0.0.1:8080/api/listings/',
//           formData,
//           { headers }
//         );
//       }

//       setLoading(false);
//       navigate(`/listings/${response.data.id}`);
//     } catch (err) {
//       setLoading(false);
//       setError(err.response?.data?.message || 'An error occurred while saving the listing');
//       console.error('Error submitting form:', err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       )}
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Price ($/month)</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//             min="0"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
//           <input
//             type="number"
//             name="bedrooms"
//             value={formData.bedrooms}
//             onChange={handleChange}
//             required
//             min="0"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
//           <input
//             type="number"
//             name="bathrooms"
//             value={formData.bathrooms}
//             onChange={handleChange}
//             required
//             min="0"
//             step="0.5"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//           rows="4"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
//           <input
//             type="text"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
//           <input
//             type="text"
//             name="zip_code"
//             value={formData.zip_code}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
//         <AmenitiesSelector 
//           selectedAmenities={formData.amenities} 
//           onChange={handleAmenitiesChange} 
//         />
//       </div>
      
//       <div className="flex justify-end space-x-3">
//         <button
//           type="button"
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//         >
//           {loading ? 'Saving...' : isEditing ? 'Update Listing' : 'Create Listing'}
//         </button>
//       </div>
//     </form>
//   );
// };

// ListingForm.propTypes = {
//   initialData: PropTypes.object,
//   isEditing: PropTypes.bool
// };

// export default ListingForm;






import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AmenitiesSelector from './AmenitiesSelector';
import useListings from '../../hooks/useListings';

const ListingForm = ({ 
  initialData, 
  isEditing = false, 
  onSubmit, 
  isLoading, 
  amenities = [], 
  error: propError,
  token
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    amenities: []
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        price: initialData.price || '',
        bedrooms: initialData.bedrooms || '',
        bathrooms: initialData.bathrooms || '',
        address: initialData.address || '',
        city: initialData.city || '',
        state: initialData.state || '',
        zip_code: initialData.zip_code || '',
        amenities: initialData.amenities?.map(a => a.id) || []
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (propError) {
      setError(propError);
    }
  }, [propError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' 
        ? Number(value) || '' 
        : value
    }));
  };

  const handleAmenitiesChange = (selectedAmenities) => {
    setFormData(prev => ({
      ...prev,
      amenities: selectedAmenities
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError('You must be logged in to create or edit a listing');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'An error occurred while saving the listing');
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(error || propError) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || propError}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($/month)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
            min="0"
            step="0.5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
          <input
            type="text"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
        <AmenitiesSelector 
          selectedAmenities={formData.amenities} 
          onChange={handleAmenitiesChange}
          availableAmenities={amenities}
        />
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : isEditing ? 'Update Listing' : 'Create Listing'}
        </button>
      </div>
    </form>
  );
};

ListingForm.propTypes = {
  initialData: PropTypes.object,
  isEditing: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  amenities: PropTypes.array,
  error: PropTypes.string,
  token: PropTypes.string
};

export default ListingForm;