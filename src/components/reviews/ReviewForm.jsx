import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ReviewForm = ({ listingId, onSubmitSuccess }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please enter review content');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to submit a review');
        setLoading(false);
        return;
      }
      
      await axios.post(
        'http://127.0.0.1:5000/api/reviews/',
        {
          content,
          rating,
          listing_id: listingId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setContent('');
      setRating(5);
      setLoading(false);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
      setLoading(false);
      console.error('Error submitting review:', err);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium mb-3">Write a Review</h3>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
              >
                <span className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Share your experience with this property..."
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  listingId: PropTypes.string.isRequired,
  onSubmitSuccess: PropTypes.func
};

export default ReviewForm;