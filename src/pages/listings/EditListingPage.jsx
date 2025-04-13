import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import ListingForm from '../../components/listings/ListingForm';  


import LoadingSpinner from '../../components/ui/LoadingSpinner';

import useListings from '../../hooks/useListings';
import useAuth from '../../hooks/useAuth';


const EditListingPage = () => {
  const { listingId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [amenities, setAmenities] = useState([]);
  const { getSingleListing, listing, updateListing, getAllAmenities } = useListings();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        await getSingleListing(listingId);
        const amenitiesData = await getAllAmenities();
        setAmenities(amenitiesData);
      } catch (err) {
        setError('Failed to load listing details. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (listingId) {
      fetchData();
    }
  }, [listingId, getSingleListing, getAllAmenities]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (listing && user && listing.user_id !== user.id) {
      navigate('/listings');
    }
  }, [listing, user, isAuthenticated, navigate]);

  const handleSubmit = async (updatedData) => {
    setSubmitLoading(true);
    setError('');
    try {
      await updateListing(listingId, updatedData);
      navigate(`/listings/${listingId}`);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to update listing. Please try again.'
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || (listing && user && listing.user_id !== user.id)) {
    return <div className="unauthorized">You are not authorized to edit this listing.</div>;
  }

  return (
    <div className="edit-listing-page">
      <div className="container">
        <h1>Edit Listing</h1>
        {error && <div className="error-message">{error}</div>}
        
        <ListingForm 
          onSubmit={handleSubmit}
          isLoading={submitLoading}
          listing={listing}
          amenities={amenities}
          isEditing={true}
        />
        
        <div className="form-actions">
          <Link to={`/listings/${listingId}`} className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditListingPage;