// import React, { useEffect } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
// import LoadingSpinner from './LoadingSpinner';

// const ProtectedRoute = ({ children, roles = [] }) => {
//   const { isAuthenticated, user, loading, checkAuth } = useAuth();
//   const location = useLocation();

//   useEffect(() => {
//     checkAuth(); // Always run on mount
//   }, [checkAuth]);

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (roles.length > 0 && !roles.includes(user?.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;



// 2nd


// // ProtectedRoute.jsx
// import React, { useEffect, useState } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
// import LoadingSpinner from './LoadingSpinner';

// const ProtectedRoute = ({ children, roles = [] }) => {
//   const { token, user, loading, fetchCurrentUser } = useAuth();
//   const [authChecked, setAuthChecked] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const verifyAuth = async () => {
//       if (token) {
//         try {
//           await fetchCurrentUser();
//         } catch (err) {
//           // Error will be handled by the hook
//           console.log(err)
//         }
//       }
//       setAuthChecked(true);
//     };
    
//     verifyAuth();
//   }, [token, fetchCurrentUser]);

//   if (loading || !authChecked) {
//     return <LoadingSpinner />;
//   }

//   if (!token) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (roles.length > 0 && !roles.includes(user?.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;




// 3rd

import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user, loading, fetchCurrentUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    fetchCurrentUser(); // Changed checkAuth to fetchCurrentUser
  }, [fetchCurrentUser]);

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