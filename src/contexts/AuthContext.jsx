import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set tokens and store in localStorage
  const setAuthTokens = (accessToken, newRefreshToken) => {
    if (accessToken) {
      localStorage.setItem('token', accessToken);
      setToken(accessToken);
    }
    
    if (newRefreshToken) {
      localStorage.setItem('refreshToken', newRefreshToken);
      setRefreshToken(newRefreshToken);
    }
  };

  // Clear tokens and user from state and localStorage
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  // Check if the user is authenticated
  const isAuthenticated = () => {
    return !!token;
  };

  // Reset error state
  const clearError = () => {
    setError(null);
  };

  // Check if token exists on initial load
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        if (token) {
          // Logic to fetch current user with the token will be handled in useAuth hook
          // but we can set authentication state here
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication');
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const value = {
    user,
    setUser,
    token,
    refreshToken,
    setAuthTokens,
    logout,
    isAuthenticated,
    loading,
    error,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};