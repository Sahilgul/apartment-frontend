import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ListingDetail from '../../components/listings/ListingDetail';

import ReviewsList from '../../components/reviews/ReviewsList';

import LoadingSpinner from '../../components/ui/LoadingSpinner';
import useListings from '../../hooks/useListings';
import useReviews from '../../hooks/useReviews';
import useAuth from '../../hooks/useAuth';


const ListingDetailPage = () => {
  const { listingId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { getSingleListing, listing, deleteListing } = useListings();
  const { getListingReviews, reviews } = useReviews();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        await getSingleListing(listingId);
        await getListingReviews(listingId);
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
  }, [listingId, getSingleListing, getListingReviews]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await deleteListing(listingId);
        navigate('/listings');
      } catch (err) {
        setError('Failed to delete listing. Please try again.');
        console.error(err);
      }
    }
  };

  const isOwner = listing && user && listing.user_id === user.id;

  return (
    <div className="listing-detail-page">
      <div className="container">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="listing-actions">
              <Link to="/listings" className="btn btn-secondary">
                Back to Listings
              </Link>
              {isOwner && (
                <div className="owner-actions">
                  <Link to={`/listings/edit/${listingId}`} className="btn btn-primary">
                    Edit Listing
                  </Link>
                  <button onClick={handleDelete} className="btn btn-danger">
                    Delete Listing
                  </button>
                </div>
              )}
            </div>

            <ListingDetail listing={listing} />

            <div className="reviews-section">
              <h2>Reviews</h2>
              {isAuthenticated && (
                <Link to={`/reviews/create/${listingId}`} className="btn btn-primary">
                  Write a Review
                </Link>
              )}
              <ReviewsList reviews={reviews} listingId={listingId} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListingDetailPage;