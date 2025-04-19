import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ReviewsList from '../reviews/ReviewsList';
import ReviewForm from '../reviews/ReviewForm';
import axios from 'axios';

const ListingDetail = ({ listingId }) => {
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8080/api/listings/${listingId}`);
        setListing(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load listing details');
        setLoading(false);
        console.error('Error fetching listing:', err);
      }
    };

    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:8080/api/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCurrentUser(response.data);
        } catch (err) {
          console.error('Error fetching current user:', err);
        }
      }
    };

    fetchListing();
    fetchCurrentUser();
  }, [listingId]);

  const handleEditListing = () => {
    navigate(`/listings/edit/${listingId}`);
  };

  const handleDeleteListing = async () => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8080/api/listings/${listingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/listings');
    } catch (err) {
      setError('Failed to delete listing');
      console.error('Error deleting listing:', err);
    }
  };

  const isOwner = currentUser && listing && currentUser.id === listing.user_id;

  if (loading) return <div className="text-center py-8">Loading listing details...</div>;
  if (error) return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  if (!listing) return <div className="text-center py-8">Listing not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Image Gallery */}
        <div className="h-64 md:h-96 bg-gray-200 relative">
          {listing.images && listing.images.length > 0 ? (
            <img 
              src={listing.images[0]} 
              alt={listing.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-300">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>

        {/* Listing Details */}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
              <p className="text-gray-600 mt-1">
                {listing.address}, {listing.city}, {listing.state} {listing.zip_code}
              </p>
            </div>
            <div className="text-xl font-semibold text-blue-600">${listing.price}/month</div>
          </div>

          <div className="flex items-center mt-4 text-gray-700">
            <div className="mr-6">
              <span className="font-semibold">{listing.bedrooms}</span> bed{listing.bedrooms !== 1 ? 's' : ''}
            </div>
            <div>
              <span className="font-semibold">{listing.bathrooms}</span> bath{listing.bathrooms !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Description</h2>
            <p className="mt-2 text-gray-700">{listing.description}</p>
          </div>

          {/* Amenities */}
          {listing.amenities && listing.amenities.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Amenities</h2>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                {listing.amenities.map(amenity => (
                  <div key={amenity.id} className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Owner actions */}
          {isOwner && (
            <div className="mt-6 flex space-x-3">
              <button
                onClick={handleEditListing}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Listing
              </button>
              <button
                onClick={handleDeleteListing}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete Listing
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
          {currentUser && !isOwner && (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
          )}
        </div>

        {showReviewForm && (
          <div className="mb-6">
            <ReviewForm listingId={listingId} onSubmitSuccess={() => setShowReviewForm(false)} />
          </div>
        )}

        <ReviewsList listingId={listingId} />
      </div>
    </div>
  );
};

ListingDetail.propTypes = {
  listingId: PropTypes.string.isRequired
};

export default ListingDetail;