// // import { useState, useContext, useCallback } from 'react';
// // import { AuthContext } from '../contexts/AuthContext';
// // import * as authApi from '../api/auth';

// // const useAuth = () => {
// //   const { 
// //     user,           // Add this
// //     setUser, 
// //     setAuthTokens, 
// //     logout, 
// //     token,
// //     refreshToken 
// //   } = useContext(AuthContext);
  
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   // Register a new user
// //   const register = async (userData) => {
// //     setLoading(true);
// //     setError(null);
    
// //     try {
// //       const response = await authApi.register(userData);
// //       setAuthTokens(response.token, response.refreshToken);
// //       setUser(response.user);
// //       return response.user;
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Registration failed');
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Login user
// //   const login = async (credentials) => {
// //     setLoading(true);
// //     setError(null);
    
// //     try {
// //       const response = await authApi.login(credentials);
// //       setAuthTokens(response.token, response.refreshToken);
// //       setUser(response.user);
// //       return response.user;
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Login failed');
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Fetch current user data
// //   const fetchCurrentUser = useCallback(async () => {
// //     if (!token) return null;
    
// //     setLoading(true);
// //     setError(null);
    
// //     try {
// //       const userData = await authApi.getCurrentUser(token);
// //       setUser(userData);
// //       return userData;
// //     } catch (err) {
// //       // If token is invalid, try to refresh it
// //       if (err.response?.status === 401 && refreshToken) {
// //         try {
// //           const refreshData = await authApi.refreshToken(refreshToken);
// //           setAuthTokens(refreshData.token, refreshData.refreshToken);
          
// //           // Retry getting user with new token
// //           const userData = await authApi.getCurrentUser(refreshData.token);
// //           setUser(userData);
// //           return userData;
// //         } catch (refreshErr) {
// //           // If refresh fails, log the user out
// //           logout();
// //           setError('Session expired. Please login again.');
// //           throw refreshErr;
// //         }
// //       } else {
// //         setError(err.response?.data?.message || 'Failed to fetch user data');
// //         throw err;
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [token, refreshToken, setUser, setAuthTokens, logout]);

// //   // Verify user email
// //   const verifyUser = async (userId) => {
// //     setLoading(true);
// //     setError(null);
    
// //     try {
// //       await authApi.verifyUser(userId);
// //       return true;
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Verification failed');
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return {
// //     register,
// //     login,
// //     logout,
// //     fetchCurrentUser,
// //     verifyUser,
// //     loading,
// //     error,
// //     user,   // Add this
// //     token,
// //     setError
// //   };
// // };

// // export default useAuth;




// import { useState, useContext, useCallback } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import * as authApi from '../api/auth';

// const useAuth = () => {
//   const { 
//     user,
//     setUser, 
//     setAuthTokens, 
//     logout, 
//     token,
//     refreshToken 
//   } = useContext(AuthContext);
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   // Add isAuthenticated computed property
//   const isAuthenticated = !!token && !!user;
  
//   // Register a new user
//   const register = async (userData) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await authApi.register(userData);
//       setAuthTokens(response.token, response.refreshToken);
//       setUser(response.user);
//       return response.user;
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Login user
//   const login = async (credentials) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await authApi.login(credentials);
//       setAuthTokens(response.token, response.refreshToken);
//       setUser(response.user);
//       return response.user;
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Fetch current user data
//   const fetchCurrentUser = useCallback(async () => {
//     if (!token) return null;
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       const userData = await authApi.getCurrentUser(token);
//       setUser(userData);
//       return userData;
//     } catch (err) {
//       // If token is invalid, try to refresh it
//       if (err.response?.status === 401 && refreshToken) {
//         try {
//           const refreshData = await authApi.refreshToken(refreshToken);
//           setAuthTokens(refreshData.token, refreshData.refreshToken);
          
//           // Retry getting user with new token
//           const userData = await authApi.getCurrentUser(refreshData.token);
//           setUser(userData);
//           return userData;
//         } catch (refreshErr) {
//           // If refresh fails, log the user out
//           logout();
//           setError('Session expired. Please login again.');
//           throw refreshErr;
//         }
//       } else {
//         setError(err.response?.data?.message || 'Failed to fetch user data');
//         throw err;
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [token, refreshToken, setUser, setAuthTokens, logout]);
  
//   // Verify user email
//   const verifyUser = async (userId) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       await authApi.verifyUser(userId);
//       return true;
//     } catch (err) {
//       setError(err.response?.data?.message || 'Verification failed');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return {
//     register,
//     login,
//     logout,
//     fetchCurrentUser,
//     verifyUser,
//     loading,
//     error,
//     user,
//     token,
//     isAuthenticated,  // Add this line
//     setError
//   };
// };

// export default useAuth;




import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import authAPI from '../api/auth'; // Import default export, not * as authApi

const useAuth = () => {
  const { 
    user,
    setUser, 
    setAuthTokens, 
    logout: contextLogout, 
    token,
    refreshToken 
  } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Add isAuthenticated computed property
  const isAuthenticated = !!token && !!user;
  
  // Register a new user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.register(userData);
      // The token is stored in localStorage by the API function
      // We need to get it and set it in our context
      const newToken = authAPI.getToken();
      const userData = authAPI.getCurrentUser();
      
      if (newToken) {
        setAuthTokens(newToken, localStorage.getItem('refreshToken'));
        setUser(userData);
      }
      
      return response.data;
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
      const response = await authAPI.login(credentials);
      // The token is stored in localStorage by the API function
      // We need to get it and set it in our context
      const newToken = authAPI.getToken();
      const userData = authAPI.getCurrentUser();
      
      if (newToken) {
        setAuthTokens(newToken, localStorage.getItem('refreshToken'));
        setUser(userData);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout user
  const logout = () => {
    authAPI.logout(); // This clears localStorage
    contextLogout(); // This clears context state
  };
  
  // Fetch current user data
  const fetchCurrentUser = useCallback(async () => {
    if (!authAPI.isLoggedIn()) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      // We're getting user data from localStorage, not from an API call
      const userData = authAPI.getCurrentUser();
      setUser(userData);
      return userData;
    } catch (err) {
      // No need to try refreshing the token here since we're just reading from localStorage
      setError('Failed to fetch user data');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setUser]);
  
  // Verify user email
  const verifyUser = async (userId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.verifyUser(userId);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (userData) => {
    if (setUser) {
      setUser(userData);
    } else {
      console.error('setUser function not available in AuthContext');
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
    user,
    updateUser,
    token,
    isAuthenticated,
    setError
  };
};

export default useAuth;