import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';


import ReviewForm from '../../components/reviews/ReviewForm';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import useReviews from '../../hooks/useReviews';
import useAuth from '../../hooks/useAuth';

const EditReviewPage = () => {
  const { reviewId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [review, setReview] = useState(null);
  const { updateReview } = useReviews();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you would fetch the review by ID
    // Since there's no endpoint for that in the provided list,
    // we're assuming the review data would be available from context
    // or passed via navigation state
    const fetchReview = async () => {
      setIsLoading(true);
      try {
        // Mocked for now - in a real app, you'd fetch the review
        // const response = await getReviewById(reviewId);
        // setReview(response.data);
        
        // For now, we'll just set a loading state
        // This would be replaced with actual API call
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load review. Please try again.');
        console.error(err);
        setIsLoading(false);
      }
    };

    if (reviewId) {
      fetchReview();
    }
  }, [reviewId]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    // In a real app, you would check if the user is the author of the review
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (reviewData) => {
    setSubmitLoading(true);
    setError('');
    try {
      await updateReview(reviewId, reviewData);
      // Navigate back to the listing detail page
      // Assuming the review has a listing_id property
      navigate(`/listings/${review?.listing_id}`);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to update review. Please try again.'
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }

  return (
    <div className="edit-review-page">
      <div className="container">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <h1>Edit Your Review</h1>
            <ReviewForm 
              onSubmit={handleSubmit}
              isLoading={submitLoading}
              review={review}
              isEditing={true}
            />
            <div className="form-actions">
              <Link to={`/listings/${review?.listing_id}`} className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditReviewPage;