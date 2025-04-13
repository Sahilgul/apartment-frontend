import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../../api/auth';
import * as usersAPI from '../../api/users';
import { setAuthToken, removeAuthToken, getRefreshToken, setRefreshToken, removeRefreshToken } from '../../utils/auth';

// Async thunks
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      setAuthToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      setAuthToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshTokenValue = getRefreshToken();
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }
      const response = await authAPI.refreshToken(refreshTokenValue);
      setAuthToken(response.data.access_token);
      if (response.data.refresh_token) {
        setRefreshToken(response.data.refresh_token);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersAPI.getCurrentUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  'auth/updateCurrentUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await usersAPI.updateCurrentUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      removeAuthToken();
      removeRefreshToken();
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Registration failed' };
      })
      
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Login failed' };
      })
      
      // Refresh token cases
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || { message: 'Token refresh failed' };
        removeAuthToken();
        removeRefreshToken();
      })
      
      // Fetch current user cases
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || { message: 'Failed to fetch user' };
      })
      
      // Update current user cases
      .addCase(updateCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to update user' };
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;