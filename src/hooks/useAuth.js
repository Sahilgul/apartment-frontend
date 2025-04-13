import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import * as authApi from '../api/auth';

const useAuth = () => {
  const { 
    setUser, 
    setAuthTokens, 
    logout, 
    token, 
    refreshToken 
  } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Register a new user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authApi.register(userData);
      setAuthTokens(response.token, response.refreshToken);
      setUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authApi.login(credentials);
      setAuthTokens(response.token, response.refreshToken);
      setUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch current user data
  const fetchCurrentUser = useCallback(async () => {
    if (!token) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      const userData = await authApi.getCurrentUser(token);
      setUser(userData);
      return userData;
    } catch (err) {
      // If token is invalid, try to refresh it
      if (err.response?.status === 401 && refreshToken) {
        try {
          const refreshData = await authApi.refreshToken(refreshToken);
          setAuthTokens(refreshData.token, refreshData.refreshToken);
          
          // Retry getting user with new token
          const userData = await authApi.getCurrentUser(refreshData.token);
          setUser(userData);
          return userData;
        } catch (refreshErr) {
          // If refresh fails, log the user out
          logout();
          setError('Session expired. Please login again.');
          throw refreshErr;
        }
      } else {
        setError(err.response?.data?.message || 'Failed to fetch user data');
        throw err;
      }
    } finally {
      setLoading(false);
    }
  }, [token, refreshToken, setUser, setAuthTokens, logout]);

  // Verify user email
  const verifyUser = async (userId) => {
    setLoading(true);
    setError(null);
    
    try {
      await authApi.verifyUser(userId);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    login,
    logout,
    fetchCurrentUser,
    verifyUser,
    loading,
    error,
    setError
  };
};

export default useAuth;
