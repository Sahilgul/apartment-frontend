import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as listingsAPI from '../../api/listings';
import * as usersAPI from '../../api/users';
import * as searchAPI from '../../api/search';

// Async thunks
export const fetchAllListings = createAsyncThunk(
  'listings/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await listingsAPI.getAllListings();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const fetchListingById = createAsyncThunk(
  'listings/fetchById',
  async (listingId, { rejectWithValue }) => {
    try {
      const response = await listingsAPI.getListingById(listingId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const createListing = createAsyncThunk(
  'listings/create',
  async (listingData, { rejectWithValue }) => {
    try {
      const response = await listingsAPI.createListing(listingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const updateListing = createAsyncThunk(
  'listings/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await listingsAPI.updateListing(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const deleteListing = createAsyncThunk(
  'listings/delete',
  async (listingId, { rejectWithValue }) => {
    try {
      await listingsAPI.deleteListing(listingId);
      return listingId;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const fetchAllAmenities = createAsyncThunk(
  'listings/fetchAmenities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await listingsAPI.getAllAmenities();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const fetchUserListings = createAsyncThunk(
  'listings/fetchUserListings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersAPI.getUserListings();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const searchListings = createAsyncThunk(
  'listings/search',
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await searchAPI.searchListings(searchParams);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const initialState = {
  listings: [],
  currentListing: null,
  userListings: [],
  searchResults: [],
  amenities: [],
  loading: false,
  error: null,
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    clearCurrentListing: (state) => {
      state.currentListing = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all listings cases
      .addCase(fetchAllListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
      })
      .addCase(fetchAllListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to fetch listings' };
      })
      
      // Fetch listing by ID cases
      .addCase(fetchListingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentListing = action.payload;
      })
      .addCase(fetchListingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to fetch listing' };
      })
      
      // Create listing cases
      .addCase(createListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listings.push(action.payload);
        state.userListings.push(action.payload);
      })
      .addCase(createListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to create listing' };
      })
      
      // Update listing cases
      .addCase(updateListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.loading = false;
        state.currentListing = action.payload;
        
        // Update in listings array
        const index = state.listings.findIndex(listing => listing.id === action.payload.id);
        if (index !== -1) {
          state.listings[index] = action.payload;
        }
        
        // Update in userListings array
        const userIndex = state.userListings.findIndex(listing => listing.id === action.payload.id);
        if (userIndex !== -1) {
          state.userListings[userIndex] = action.payload;
        }
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to update listing' };
      })
      
      // Delete listing cases
      .addCase(deleteListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = state.listings.filter(listing => listing.id !== action.payload);
        state.userListings = state.userListings.filter(listing => listing.id !== action.payload);
        if (state.currentListing && state.currentListing.id === action.payload) {
          state.currentListing = null;
        }
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to delete listing' };
      })
      
      // Fetch amenities cases
      .addCase(fetchAllAmenities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAmenities.fulfilled, (state, action) => {
        state.loading = false;
        state.amenities = action.payload;
      })
      .addCase(fetchAllAmenities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to fetch amenities' };
      })
      
      // Fetch user listings cases
      .addCase(fetchUserListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserListings.fulfilled, (state, action) => {
        state.loading = false;
        state.userListings = action.payload;
      })
      .addCase(fetchUserListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to fetch user listings' };
      })
      
      // Search listings cases
      .addCase(searchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to search listings' };
      });
  }
});

export const { clearCurrentListing, clearError } = listingsSlice.actions;
export default listingsSlice.reducer;