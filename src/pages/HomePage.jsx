// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import SearchBar from '../components/search/SearchBar';
// import ListingsGrid from '../components/listings/ListingsGrid';
// import LoadingSpinner from '../components/ui/LoadingSpinner';
// import useListings from '../hooks/useListings';

// const HomePage = () => {
//   const [featuredListings, setFeaturedListings] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { getAllListings, listings } = useListings();

//   useEffect(() => {
//     const fetchListings = async () => {
//       setIsLoading(true);
//       setError('');
//       try {
//         await getAllListings();
//         // For featured listings, we're just taking the first 4
//         // In a real app, you might have a separate endpoint for featured listings
//         setFeaturedListings(listings.slice(0, 4));
//       } catch (err) {
//         setError('Failed to load listings. Please try again later.');
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchListings();
//   }, [getAllListings, listings]);

//   return (
//     <div className="home-page">
//       <section className="hero-section">
//         <div className="container">
//           <h1>Find Your Perfect Apartment</h1>
//           <p>Browse thousands of listings to find your next home</p>
//           <div className="search-container">
//             <SearchBar />
//           </div>
//         </div>
//       </section>

//       <section className="featured-listings">
//         <div className="container">
//           <h2>Featured Listings</h2>
//           {isLoading ? (
//             <LoadingSpinner />
//           ) : error ? (
//             <div className="error-message">{error}</div>
//           ) : (
//             <>
//               <ListingsGrid listings={featuredListings} />
//               <div className="view-all">
//                 <Link to="/listings" className="btn btn-primary">
//                   View All Listings
//                 </Link>
//               </div>
//             </>
//           )}
//         </div>
//       </section>

//       <section className="cta-section">
//         <div className="container">
//           <div className="cta-content">
//             <h2>List Your Property</h2>
//             <p>Reach thousands of potential tenants looking for their next home.</p>
//             <Link to="/listings/create" className="btn btn-primary">
//               Create Listing
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import ListingsGrid from '../components/listings/ListingsGrid';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import useListings from '../hooks/useListings';

const HomePage = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { listings, fetchListings, loading } = useListings();

  useEffect(() => {
    const loadListings = async () => {
      setIsLoading(true);
      setError('');
      try {
        await fetchListings();
        // Ensure listings is an array before slicing
        if (Array.isArray(listings)) {
          setFeaturedListings(listings.slice(0, 4));
        } else {
          console.warn('Expected listings to be an array, got:', listings);
          setFeaturedListings([]);
        }
      } catch (err) {
        setError('Failed to load listings. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadListings();
  }, [fetchListings]); // Removed listings from dependencies to avoid infinite loops

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <h1>Find Your Perfect Apartment</h1>
          <p>Browse thousands of listings to find your next home</p>
          <div className="search-container">
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="featured-listings">
        <div className="container">
          <h2>Featured Listings</h2>
          {isLoading || loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              <ListingsGrid listings={featuredListings} />
              <div className="view-all">
                <Link to="/listings" className="btn btn-primary">
                  View All Listings
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>List Your Property</h2>
            <p>Reach thousands of potential tenants looking for their next home.</p>
            <Link to="/listings/create" className="btn btn-primary">
              Create Listing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;