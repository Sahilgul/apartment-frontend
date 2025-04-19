import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReviewCard from './ReviewCard';

const ReviewsList = ({ listingId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8080/api/reviews/listing/${listingId}`);
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load reviews');
        setLoading(false);
        console.error('Error fetching reviews:', err);
      }
    };

    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:8080/api/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCurrentUserId(response.data.id);
        } catch (err) {
          console.error('Error fetching current user:', err);
        }
      }
    };

    fetchReviews();
    fetchCurrentUser();
  }, [listingId]);

  const handleReviewUpdated = (updatedReview) => {
    setReviews(reviews.map(review => 
      review.id === updatedReview.id ? updatedReview : review
    ));
  };

  const handleReviewDeleted = (reviewId) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  if (loading) {
    return <div className="text-center py-4">Loading reviews...</div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-gray-500 py-4">No reviews yet. Be the first to leave a review!</div>;
  }

  return (
    <div className="space-y-2">
      {reviews.map(review => (
        <ReviewCard
          key={review.id}
          review={review}
          currentUserId={currentUserId}
          onReviewUpdated={handleReviewUpdated}
          onReviewDeleted={handleReviewDeleted}
        />
      ))}
    </div>
  );
};

ReviewsList.propTypes = {
  listingId: PropTypes.string.isRequired
};

export default ReviewsList;