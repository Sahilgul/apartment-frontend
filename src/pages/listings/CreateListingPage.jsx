import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import ListingForm from '../../components/listings/ListingForm';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import useListings from '../../hooks/useListings';
import useAuth from '../../hooks/useAuth';


const CreateListingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [amenitiesLoading, setAmenitiesLoading] = useState(true);
  const [error, setError] = useState('');
  const [amenities, setAmenities] = useState([]);
  const { createListing, getAllAmenities } = useListings();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const data = await getAllAmenities();
        setAmenities(data);
      } catch (err) {
        console.error('Failed to load amenities:', err);
      } finally {
        setAmenitiesLoading(false);
      }
    };

    fetchAmenities();
  }, [getAllAmenities]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (listingData) => {
    setIsLoading(true);
    setError('');
    try {
      await createListing(listingData);
      navigate('/listings');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to create listing. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }

  return (
    <div className="create-listing-page">
      <div className="container">
        <h1>Create New Listing</h1>
        {error && <div className="error-message">{error}</div>}
        
        {amenitiesLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ListingForm 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
              amenities={amenities}
            />
            <div className="form-actions">
              <Link to="/listings" className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateListingPage;