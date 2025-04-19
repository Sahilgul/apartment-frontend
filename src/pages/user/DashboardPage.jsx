// // import { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';

// // import UserListings from '../../components/user/UserListings';
// // import LoadingSpinner from '../../components/ui/LoadingSpinner';
// // import useAuth from '../../hooks/useAuth';
// // import useUser from '../../hooks/useUser';
 
// // const DashboardPage = () => {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const { isAuthenticated, user } = useAuth();
// //   const { getUserListings, listings } = useUser();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (!isAuthenticated) {
// //       navigate('/login');
// //       return;
// //     }

// //     const fetchUserListings = async () => {
// //       setIsLoading(true);
// //       setError('');
// //       try {
// //         await getUserListings();
// //       } catch (err) {
// //         setError('Failed to load your listings. Please try again.');
// //         console.error(err);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchUserListings();
// //   }, [isAuthenticated, getUserListings, navigate]);

// //   if (!isAuthenticated) {
// //     return <LoadingSpinner />;
// //   }

// //   return (
// //     <div className="dashboard-page">
// //       <div className="container">
// //         <div className="dashboard-header">
// //           <h1>Your Dashboard</h1>
// //           <Link to="/profile" className="btn btn-secondary">
// //             View Profile
// //           </Link>
// //         </div>

// //         <div className="dashboard-content">
// //           <section className="user-listings-section">
// //             <div className="section-header">
// //               <h2>Your Listings</h2>
// //               <Link to="/listings/create" className="btn btn-primary">
// //                 Create New Listing
// //               </Link>
// //             </div>

// //             {isLoading ? (
// //               <LoadingSpinner />
// //             ) : error ? (
// //               <div className="error-message">{error}</div>
// //             ) : listings.length === 0 ? (
// //               <div className="no-listings">
// //                 <p>You haven't created any listings yet.</p>
// //                 <Link to="/listings/create" className="btn btn-primary">
// //                   Create Your First Listing
// //                 </Link>
// //               </div>
// //             ) : (
// //               <UserListings listings={listings} />
// //             )}
// //           </section>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DashboardPage;

// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import UserListings from '../../components/user/UserListings';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import useAuth from '../../hooks/useAuth';
// import useUser from '../../hooks/useUser';

// const DashboardPage = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { isAuthenticated, user } = useAuth();
//   const { getUserListings, listings } = useUser();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }

//     // Check if user is a landlord before fetching listings
//     if (user?.role !== 'landlord') {
//       setError('Only landlords can access this dashboard');
//       setIsLoading(false);
//       return;
//     }

//     const fetchUserListings = async () => {
//       setIsLoading(true);
//       setError('');
//       try {
//         await getUserListings();
//       } catch (err) {
//         setError(err.response?.data?.error || 'Failed to load your listings. Please try again.');
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserListings();
//   }, [isAuthenticated, getUserListings, navigate, user?.role]);

//   if (!isAuthenticated) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="dashboard-page">
//       <div className="container">
//         <div className="dashboard-header">
//           <h1>Your Dashboard</h1>
//           <Link to="/profile" className="btn btn-secondary">
//             View Profile
//           </Link>
//         </div>

//         <div className="dashboard-content">
//           <section className="user-listings-section">
//             <div className="section-header">
//               <h2>Your Listings</h2>
//               {user?.role === 'landlord' && (
//                 <Link to="/listings/create" className="btn btn-primary">
//                   Create New Listing
//                 </Link>
//               )}
//             </div>

//             {isLoading ? (
//               <LoadingSpinner />
//             ) : error ? (
//               <div className="error-message">{error}</div>
//             ) : user?.role !== 'landlord' ? (
//               <div className="no-listings">
//                 <p>This dashboard is only available to landlords.</p>
//               </div>
//             ) : listings.length === 0 ? (
//               <div className="no-listings">
//                 <p>You haven't created any listings yet.</p>
//                 <Link to="/listings/create" className="btn btn-primary">
//                   Create Your First Listing
//                 </Link>
//               </div>
//             ) : (
//               <UserListings listings={listings} />
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;


import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserListings from '../../components/user/UserListings';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, user } = useAuth();
  const { getUserListings, listings } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Check if user is a landlord before fetching listings
    if (user?.role !== 'landlord') {
      setError('Only landlords can access this dashboard');
      setIsLoading(false);
      return;
    }

    const fetchUserListings = async () => {
      setIsLoading(true);
      setError('');
      try {
        await getUserListings();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load your listings. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserListings();
  }, [isAuthenticated, getUserListings, navigate, user?.role]);

  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Your Dashboard</h1>
          <Link to="/profile" className="btn btn-secondary">
            View Profile
          </Link>
        </div>
        <div className="dashboard-content">
          <section className="user-listings-section">
            <div className="section-header">
              <h2>Your Listings</h2>
              {user?.role === 'landlord' && (
                <Link to="/listings/create" className="btn btn-primary">
                  Create New Listing
                </Link>
              )}
            </div>
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : user?.role !== 'landlord' ? (
              <div className="no-listings">
                <p>This dashboard is only available to landlords.</p>
              </div>
            ) : !listings || listings.length === 0 ? (
              <div className="no-listings">
                <p>You haven't created any listings yet.</p>
                <Link to="/listings/create" className="btn btn-primary">
                  Create Your First Listing
                </Link>
              </div>
            ) : (
              <UserListings listings={listings} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;