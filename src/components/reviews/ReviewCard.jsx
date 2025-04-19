import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { formatDistance } from 'date-fns';

const ReviewCard = ({ review, currentUserId, onReviewUpdated, onReviewDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(review.content);
  const [rating, setRating] = useState(review.rating);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isAuthor = currentUserId === review.user_id;
  const createdAt = new Date(review.created_at);
  const timeAgo = formatDistance(createdAt, new Date(), { addSuffix: true });

  const handleEdit = async () => {
    if (isEditing) {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token');
        const response = await axios.put(
          `http://127.0.0.1:8080/api/reviews/${review.id}`,
          { content, rating },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setIsEditing(false);
        setLoading(false);
        onReviewUpdated(response.data);
      } catch (err) {
        setError('Failed to update review');
        setLoading(false);
        console.error('Error updating review:', err);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8080/api/reviews/${review.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setLoading(false);
      onReviewDeleted(review.id);
    } catch (err) {
      setError('Failed to delete review');
      setLoading(false);
      console.error('Error deleting review:', err);
    }
  };

  const handleCancelEdit = () => {
    setContent(review.content);
    setRating(review.rating);
    setIsEditing(false);
    setError(null);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    return stars;
  };

  return (
    <div className="border-b border-gray-200 py-4">
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3">
          {error}
        </div>
      )}
      
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="font-medium text-gray-800">{review.username || 'Anonymous'}</div>
          <div className="ml-2 text-sm text-gray-500">{timeAgo}</div>
        </div>
        
        {!isEditing && (
          <div className="flex text-lg">
            {renderStars(review.rating)}
          </div>
        )}
      </div>
      
      {isEditing ? (
        <div className="mt-3">
          <div className="mb-3">
            <label className="block text-sm mb-1">Rating:</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-3">
            <label className="block text-sm mb-1">Review:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="3"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              disabled={loading}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={loading}
              className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-2 text-gray-700">
            {review.content}
          </div>
          
          {isAuthor && (
            <div className="mt-3 flex space-x-2">
              <button
                onClick={handleEdit}
                disabled={loading}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    user_id: PropTypes.string.isRequired,
    username: PropTypes.string,
    created_at: PropTypes.string.isRequired
  }).isRequired,
  currentUserId: PropTypes.string,
  onReviewUpdated: PropTypes.func.isRequired,
  onReviewDeleted: PropTypes.func.isRequired
};

export default ReviewCard;