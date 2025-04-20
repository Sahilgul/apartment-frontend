// import { useState, useEffect } from 'react';
// import { useLocation, Link } from 'react-router-dom';




// import ListingsGrid from '../../components/listings/ListingsGrid';
// import SearchBar from '../../components/search/SearchBar';
// import Filters from '../../components/search/Filters';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import useListings from '../../hooks/useListings';


// const SearchResultsPage = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const { searchListings } = useListings();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       setIsLoading(true);
//       setError('');
      
//       try {
//         const query = queryParams.get('q') || '';
//         const city = queryParams.get('city') || '';
//         const minPrice = queryParams.get('min_price') || '';
//         const maxPrice = queryParams.get('max_price') || '';
//         const bedrooms = queryParams.get('bedrooms') || '';
//         const bathrooms = queryParams.get('bathrooms') || '';
        
//         const results = await searchListings({
//           q: query,
//           city,
//           min_price: minPrice,
//           max_price: maxPrice,
//           bedrooms,
//           bathrooms
//         });
        
//         setSearchResults(results);
//       } catch (err) {
//         setError('Failed to load search results. Please try again.');
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSearchResults();
//   }, [location.search, searchListings]);

//   // Format the search query for display
//   const searchQuery = queryParams.get('q') || '';
//   const city = queryParams.get('city') || '';
//   const searchSummary = searchQuery && city 
//     ? `"${searchQuery}" in ${city}`
//     : searchQuery
//     ? `"${searchQuery}"`
//     : city
//     ? `Apartments in ${city}`
//     : 'All apartments';

//   return (
//     <div className="search-results-page">
//       <div className="container">
//         <div className="search-header">
//           <h1>Search Results</h1>
//           <SearchBar initialQuery={queryParams.toString()} />
//         </div>

//         <div className="search-content">
//           <div className="filters-column">
//             <Filters />
//           </div>
          
//           <div className="results-column">
//             <div className="results-summary">
//               <h2>{searchSummary}</h2>
//               <p>{searchResults.length} results found</p>
//             </div>

//             {isLoading ? (
//               <LoadingSpinner />
//             ) : error ? (
//               <div className="error-message">{error}</div>
//             ) : searchResults.length === 0 ? (
//               <div className="no-results">
//                 <p>No apartments found matching your search criteria.</p>
//                 <Link to="/listings" className="btn btn-primary">
//                   View All Listings
//                 </Link>
//               </div>
//             ) : (
//               <ListingsGrid listings={searchResults} />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchResultsPage;

import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ListingsGrid from '../../components/listings/ListingsGrid';
import SearchBar from '../../components/search/SearchBar';
import Filters from '../../components/search/Filters';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import useListings from '../../hooks/useListings';

const SearchResultsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { searchListings } = useListings();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Function to handle applying filters
  const handleApplyFilters = (filters) => {
    const newParams = new URLSearchParams();
    
    // Add search query if it exists
    if (queryParams.get('q')) {
      newParams.set('q', queryParams.get('q'));
    }
    
    // Add filter values
    if (filters.city) newParams.set('city', filters.city);
    if (filters.min_price) newParams.set('min_price', filters.min_price);
    if (filters.max_price) newParams.set('max_price', filters.max_price);
    if (filters.bedrooms) newParams.set('bedrooms', filters.bedrooms);
    if (filters.bathrooms) newParams.set('bathrooms', filters.bathrooms);
    
    // Update URL which will trigger the useEffect
    navigate(`/search?${newParams.toString()}`);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        const query = queryParams.get('q') || '';
        const city = queryParams.get('city') || '';
        const minPrice = queryParams.get('min_price') || '';
        const maxPrice = queryParams.get('max_price') || '';
        const bedrooms = queryParams.get('bedrooms') || '';
        const bathrooms = queryParams.get('bathrooms') || '';
        
        const results = await searchListings({
          q: query,
          city,
          min_price: minPrice,
          max_price: maxPrice,
          bedrooms,
          bathrooms
        });
        
        setSearchResults(results);
      } catch (err) {
        setError('Failed to load search results. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [location.search, searchListings]);

  // Get initial filter values from URL
  const initialFilters = {
    city: queryParams.get('city') || '',
    min_price: queryParams.get('min_price') || '',
    max_price: queryParams.get('max_price') || '',
    bedrooms: queryParams.get('bedrooms') || '',
    bathrooms: queryParams.get('bathrooms') || '',
    amenities: [] // You'll need to handle amenities if using them
  };

  // Format the search query for display
  const searchQuery = queryParams.get('q') || '';
  const city = queryParams.get('city') || '';
  const searchSummary = searchQuery && city 
    ? `"${searchQuery}" in ${city}`
    : searchQuery
    ? `"${searchQuery}"`
    : city
    ? `Apartments in ${city}`
    : 'All apartments';

  return (
    <div className="search-results-page">
      <div className="container">
        <div className="search-header">
          <h1>Search Results</h1>
          <SearchBar initialQuery={queryParams.toString()} />
        </div>

        <div className="search-content">
          <div className="filters-column">
            <Filters 
              initialFilters={initialFilters}
              onApplyFilters={handleApplyFilters}
            />
          </div>
          
          <div className="results-column">
            <div className="results-summary">
              <h2>{searchSummary}</h2>
              <p>{searchResults.length} results found</p>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : searchResults.length === 0 ? (
              <div className="no-results">
                <p>No apartments found matching your search criteria.</p>
                <Link to="/listings" className="btn btn-primary">
                  View All Listings
                </Link>
              </div>
            ) : (
              <ListingsGrid listings={searchResults} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;