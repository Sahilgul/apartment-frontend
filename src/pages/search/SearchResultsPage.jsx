import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';




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
  const queryParams = new URLSearchParams(location.search);

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
            <Filters />
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