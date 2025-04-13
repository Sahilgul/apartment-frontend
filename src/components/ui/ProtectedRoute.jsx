// import React, { useEffect } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// // import { useAuth } from '../../hooks/useAuth';
// // import {useAuth} from '../../hooks/useAuth'
// import useAuth from '../../hooks/useAuth';

// import LoadingSpinner from './LoadingSpinner';

// const ProtectedRoute = ({ children, roles = [] }) => {
//   const { isAuthenticated, user, loading, checkAuth } = useAuth();
//   const location = useLocation();

//   useEffect(() => {
//     if (!isAuthenticated && !loading) {
//       checkAuth();
//     }
//   }, [isAuthenticated, loading, checkAuth]);

//   // Show loading spinner while checking authentication
//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   // Redirect to login if not authenticated
//   if (!isAuthenticated) {
//     return <Navigate to="/auth/login" state={{ from: location }} replace />;
//   }

//   // Check for role-based permissions
//   if (roles.length > 0 && !roles.includes(user?.role)) {
//     return <Navigate to="/" replace />;
//   }

//   // User is authenticated and has the required role (if specified)
//   return children;
// };

// export default ProtectedRoute;


import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user, loading, checkAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    checkAuth(); // Always run on mount
  }, [checkAuth]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
