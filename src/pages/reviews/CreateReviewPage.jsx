import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';


import ReviewForm from '../../components/reviews/ReviewForm';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import useReviews from '../../hooks/useReviews';
import useListings from '../../hooks/useListings';
import useAuth from '../../hooks/useAuth';


const CreateReviewPage = () => {
  const { listingId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const { createReview } = useReviews();
  const { getSingleListing, listing } = useListings();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      setIsLoading(true);
      try {
        await getSingleListing(listingId);
      } catch (err) {
        setError('Failed to load listing details. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (listingId) {
      fetchListing();
    }
  }, [listingId, getSingleListing]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (reviewData) => {
    setSubmitLoading(true);
    setError('');
    try {
      await createReview({
        ...reviewData,
        listing_id: listingId
      });
      navigate(`/listings/${listingId}`);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to submit review. Please try again.'
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }

  return (
    <div className="create-review-page">
      <div className="container">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <h1>Write a Review for {listing?.title}</h1>
            <ReviewForm 
              onSubmit={handleSubmit}
              isLoading={submitLoading}
            />
            <div className="form-actions">
              <Link to={`/listings/${listingId}`} className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateReviewPage;