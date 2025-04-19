import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import usersAPI from '../api/users';

const useUser = () => {
  const { token, user, setUser } = useContext(AuthContext);

  const [listings, setListings] = useState([]);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    pages: 1,
    total: 0,
    perPage: 10
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the current user's profile
  const getCurrentUser = useCallback(async () => {
    if (!token) {
      setError('Authentication required');
      throw new Error('Authentication required');
    }

    setLoading(true);
    setError(null);

    try {
      const userData = await usersAPI.getCurrentUser(token);
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
  const updateUserProfile = async (userData) => {
    if (!token) {
      setError('Authentication required');
      throw new Error('Authentication required');
    }

    setLoading(true);
    setError(null);

    try {
      const updatedUser = await usersAPI.updateCurrentUser(userData, token);
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
  const getUserListings = useCallback(async (page = 1) => {
    if (!token) {
      setError('Authentication required');
      throw new Error('Authentication required');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await usersAPI.getUserListings(token, page);
      const {
        items = [],
        page: currentPage = 1,
        pages = 1,
        total = 0,
        per_page: perPage = 10
      } = response || {};

      setListings(items);
      setPaginationData({
        page: currentPage,
        pages,
        total,
        perPage
      });

      return items;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user listings');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Check if the current user is the owner of a listing
  const isListingOwner = (listingUserId) => {
    return user?.id === listingUserId;
  };

  return {
    user,
    listings,
    paginationData,
    getCurrentUser,
    updateUserProfile,
    getUserListings,
    isListingOwner,
    loading,
    error,
    setError
  };
};

export default useUser;
