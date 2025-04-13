import { useState, useContext, useCallback } from 'react';
import {AuthContext}  from '../contexts/AuthContext';
import * as userApi from '../api/users';

const useUser = () => {
  const { token, user, setUser } = useContext(AuthContext);
  
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the current user's profile
  const fetchCurrentUser = useCallback(async () => {
    if (!token) {
      setError('Authentication required');
      throw new Error('Authentication required');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const userData = await userApi.getCurrentUser(token);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token, setUser]);

  // Update the current user's profile
  const updateCurrentUser = async (userData) => {
    if (!token) {
      setError('Authentication required');
      throw new Error('Authentication required');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await userApi.updateCurrentUser(userData, token);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get listings created by the current user
  const fetchUserListings = useCallback(async () => {
    if (!token) {
      setError('Authentication required');
      throw new Error('Authentication required');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const listings = await userApi.getUserListings(token);
      setUserListings(listings);
      return listings;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user listings');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Check if the current user is the owner of a listing
  const isListingOwner = (listingUserId) => {
    if (!user) return false;
    return user.id === listingUserId;
  };

  return {
    user,
    userListings,
    fetchCurrentUser,
    updateCurrentUser,
    fetchUserListings,
    isListingOwner,
    loading,
    error,
    setError
  };
};

export default useUser;