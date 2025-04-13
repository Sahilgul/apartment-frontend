import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import * as reviewsApi from '../api/reviews';

const useReviews = () => {
  const { token } = useContext(AuthContext);
  
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch reviews for a specific listing
  const fetchListingReviews = async (listingId) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await reviewsApi.getListingReviews(listingId);
      setReviews(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch reviews');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create a new review
  const createReview = async (reviewData) => {
    if (!token) {
      setError('Authentication required');
      throw new Error('Authentication required');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await reviewsApi.createReview(reviewData, token);
      setReviews(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create review');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing review
  const updateReview = async (reviewId, updateData) => {
    if (!token) {
      setError('Authentication required');
      throw new Error('Authentication required');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const updatedReview = await reviewsApi.updateReview(reviewId, updateData, token);
      setReviews(prev => 
        prev.map(review => 
          review.id === reviewId ? updatedReview : review
        )
      );
      return updatedReview;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update review');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a review
  const deleteReview = async (reviewId) => {
    if (!token) {
      setError('Authentication required');
      throw new Error('Authentication required');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await reviewsApi.deleteReview(reviewId, token);
      setReviews(prev => prev.filter(review => review.id !== reviewId));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete review');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Calculate average rating from reviews
  const calculateAverageRating = (reviewsArray = reviews) => {
    if (!reviewsArray.length) return 0;
    
    const sum = reviewsArray.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviewsArray.length).toFixed(1);
  };

  return {
    reviews,
    fetchListingReviews,
    createReview,
    updateReview,
    deleteReview,
    calculateAverageRating,
    loading,
    error,
    setError
  };
};

export default useReviews;