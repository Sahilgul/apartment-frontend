import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as reviewsAPI from '../../api/reviews';

// Async thunks
export const fetchListingReviews = createAsyncThunk(
  'reviews/fetchListingReviews',
  async (listingId, { rejectWithValue }) => {
    try {
      const response = await reviewsAPI.getListingReviews(listingId);
      return { listingId, reviews: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const createReview = createAsyncThunk(
  'reviews/create',
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await reviewsAPI.createReview(reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const updateReview = createAsyncThunk(
  'reviews/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await reviewsAPI.updateReview(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/delete',
  async (reviewId, { rejectWithValue }) => {
    try {
      await reviewsAPI.deleteReview(reviewId);
      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const initialState = {
  reviews: {},  // Object with listing IDs as keys and arrays of reviews as values
  currentReview: null,
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearCurrentReview: (state) => {
      state.currentReview = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch listing reviews cases
      .addCase(fetchListingReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListingReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews[action.payload.listingId] = action.payload.reviews;
      })
      .addCase(fetchListingReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to fetch reviews' };
      })
      
      // Create review cases
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReview = action.payload;
        
        // Add to the correct listing's reviews
        const listingId = action.payload.listing_id;
        if (!state.reviews[listingId]) {
          state.reviews[listingId] = [];
        }
        state.reviews[listingId].push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to create review' };
      })
      
      // Update review cases
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReview = action.payload;
        
        // Update in the correct listing's reviews
        const listingId = action.payload.listing_id;
        if (state.reviews[listingId]) {
          const index = state.reviews[listingId].findIndex(review => review.id === action.payload.id);
          if (index !== -1) {
            state.reviews[listingId][index] = action.payload;
          }
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to update review' };
      })
      
      // Delete review cases
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        
        // Remove from all listings' reviews
        Object.keys(state.reviews).forEach(listingId => {
          state.reviews[listingId] = state.reviews[listingId].filter(
            review => review.id !== action.payload
          );
        });
        
        if (state.currentReview && state.currentReview.id === action.payload) {
          state.currentReview = null;
        }
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to delete review' };
      });
  }
});

export const { clearCurrentReview, clearError } = reviewsSlice.actions;
export default reviewsSlice.reducer;