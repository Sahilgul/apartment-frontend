// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// import ListingsGrid from '../../components/listings/ListingsGrid';
// import SearchBar from '../../components/search/SearchBar';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import useListings from '../../hooks/useListings';
// import useAuth from '../../hooks/useAuth';


// const ListingsPage = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
//   // const { getAllListings, listings } = useListings();
//   const { fetchListings, listings } = useListings();
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     const fetchListings = async () => {
//       setIsLoading(true);
//       setError('');
//       try {
//         await fetchListings();
//       } catch (err) {
//         setError('Failed to load listings. Please try again later.');
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchListings();
//   }, [getAllListings]);

//   return (
//     <div className="listings-page">
//       <div className="container">
//         <div className="listings-header">
//           <h1>Available Apartments</h1>
//           <SearchBar />
//           {isAuthenticated && (
//             <Link to="/listings/create" className="btn btn-primary">
//               Create New Listing
//             </Link>
//           )}
//         </div>

//         {isLoading ? (
//           <LoadingSpinner />
//         ) : error ? (
//           <div className="error-message">{error}</div>
//         ) : (
//           <ListingsGrid listings={listings} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ListingsPage;


// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// import ListingsGrid from '../../components/listings/ListingsGrid';
// import SearchBar from '../../components/search/SearchBar';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import useListings from '../../hooks/useListings';
// import useAuth from '../../hooks/useAuth';

// const ListingsPage = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { fetchListings, listings, loading } = useListings();
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     const loadListings = async () => {
//       setIsLoading(true);
//       setError('');
//       try {
//         await fetchListings();
//       } catch (err) {
//         setError('Failed to load listings. Please try again later.');
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadListings();
//   }, [fetchListings]); // Changed from getAllListings to fetchListings

//   return (
//     <div className="listings-page">
//       <div className="container">
//         <div className="listings-header">
//           <h1>Available Listings</h1>
//           {isAuthenticated && (
//             <Link to="/listings/create" className="btn btn-primary">
//               Create New Listing
//             </Link>
//           )}
//         </div>

//         <div className="search-container">
//           <SearchBar />
//         </div>

//         {isLoading || loading ? (
//           <LoadingSpinner />
//         ) : error ? (
//           <div className="error-message">{error}</div>
//         ) : (
//           <ListingsGrid listings={listings} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ListingsPage;


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListingsGrid from '../../components/listings/ListingsGrid';
import SearchBar from '../../components/search/SearchBar';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import useListings from '../../hooks/useListings';
import useAuth from '../../hooks/useAuth';

const ListingsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { fetchListings, listings = [], loading } = useListings(); // Default to empty array
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadListings = async () => {
      setIsLoading(true);
      setError('');
      try {
        await fetchListings();
      } catch (err) {
        setError('Failed to load listings. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadListings();
  }, [fetchListings]);

  return (
    <div className="listings-page">
      <div className="container">
        <div className="listings-header">
          <h1>Available Listings</h1>
          {isAuthenticated && (
            <Link to="/listings/create" className="btn btn-primary">
              Create New Listing
            </Link>
          )}
        </div>

        <div className="search-container">
          <SearchBar />
        </div>

        {isLoading || loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <ListingsGrid listings={Array.isArray(listings) ? listings : []} />
        )}
      </div>
    </div>
  );
};

export default ListingsPage;