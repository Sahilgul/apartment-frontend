import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import listingsReducer from './slices/listingsSlice';
import reviewsReducer from './slices/reviewsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingsReducer,
    reviews: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/loginUser/fulfilled', 'auth/registerUser/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user', 'listings.currentListing'],
      },
    }),
});

export default store;