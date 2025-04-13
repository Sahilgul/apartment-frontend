// import React from 'react';
// import PropTypes from 'prop-types';
// import ListingCard from './ListingCard';

// const ListingsGrid = ({ listings, loading, error }) => {
//   if (loading) {
//     return (
//       <div className="text-center py-8">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
//         <p className="mt-2 text-gray-600">Loading listings...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
//         {error}
//       </div>
//     );
//   }

//   if (!listings || listings.length === 0) {
//     return (
//       <div className="text-center py-8">
//         <p className="text-gray-600">No listings found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {listings.map(listing => (
//         <ListingCard key={listing.id} listing={listing} />
//       ))}
//     </div>
//   );
// };

// ListingsGrid.propTypes = {
//   listings: PropTypes.array,
//   loading: PropTypes.bool,
//   error: PropTypes.string
// };

// ListingsGrid.defaultProps = {
//   listings: [],
//   loading: false,
//   error: null
// };

// export default ListingsGrid;


import { Link } from 'react-router-dom';
import ListingCard from './ListingCard';

const ListingsGrid = ({ listings = [] }) => {  // Default to empty array if undefined
  if (!Array.isArray(listings)) {
    console.error('ListingsGrid expected an array, received:', listings);
    return <div className="error-message">No listings available</div>;
  }

  return (
    <div className="listings-grid">
      {listings.length > 0 ? (
        listings.map((listing) => (
          <Link 
            key={listing.id} 
            to={`/listings/${listing.id}`}
            className="listing-link"
          >
            <ListingCard listing={listing} />
          </Link>
        ))
      ) : (
        <div className="no-listings-message">
          No listings found. Please try different search criteria.
        </div>
      )}
    </div>
  );
};

export default ListingsGrid;