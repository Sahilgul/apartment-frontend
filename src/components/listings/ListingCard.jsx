// import React from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const ListingCard = ({ listing }) => {
//   return (
//     <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//       {/* Remove the Link wrapper from the entire card if you have one */}
//       <div className="p-4">
//         {/* Only use Link for specific clickable elements, not nested */}
//         <div className="h-48 bg-gray-200 mb-4">
//           <img 
//             src={listing.image || '/placeholder-image.jpg'} 
//             alt={listing.title}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <h3 className="text-xl font-semibold mb-2">
//           {listing.title}
//         </h3>
//         <p className="text-gray-600 mb-2">{listing.address}</p>
//         <div className="flex justify-between items-center">
//           <span className="font-bold">${listing.price}/mo</span>
//           <Link 
//             to={`/listings/${listing.id}`} 
//             className="text-blue-600 hover:underline"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// ListingCard.propTypes = {
//   listing: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     bedrooms: PropTypes.number.isRequired,
//     bathrooms: PropTypes.number.isRequired,
//     city: PropTypes.string.isRequired,
//     state: PropTypes.string.isRequired,
//     images: PropTypes.array
//   }).isRequired
// };

// export default ListingCard;


import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaBed, FaBath, FaMapMarkerAlt } from 'react-icons/fa';

const ListingCard = ({ listing }) => {
  // Handle image display - use first image if available, otherwise placeholder
  const mainImage = listing.images?.length > 0 
    ? listing.images[0] 
    : '/apartment.jpeg';

  // Format price with commas
  const formattedPrice = listing.price.toLocaleString();

  return (
    <Link 
      to={`/listings/${listing.id}`}
      className="block border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 hover:translate-y-[-2px]"
      aria-label={`View details for ${listing.title}`}
    >
      <div className="relative">
        <img 
          src={mainImage}
          alt={listing.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-sm font-semibold">
          ${formattedPrice}/mo
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1 truncate" title={listing.title}>
          {listing.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <FaMapMarkerAlt className="mr-1" />
          <span className="truncate">
            {listing.address}, {listing.city}, {listing.state}
          </span>
        </div>

        <div className="flex justify-between text-sm text-gray-700">
          <div className="flex items-center">
            <FaBed className="mr-1" />
            <span>{listing.bedrooms} {listing.bedrooms === 1 ? 'bed' : 'beds'}</span>
          </div>
          <div className="flex items-center">
            <FaBath className="mr-1" />
            <span>{listing.bathrooms} {listing.bathrooms === 1 ? 'bath' : 'baths'}</span>
          </div>
          <div className="flex items-center">
            <span>{listing.squareFootage ? `${listing.squareFootage} sqft` : 'Size N/A'}</span>
          </div>
        </div>

        {/* Amenities chips - only show first 3 */}
        {listing.amenities?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {listing.amenities.slice(0, 3).map(amenity => (
              <span 
                key={amenity} 
                className="px-2 py-1 bg-gray-100 text-xs rounded-full"
              >
                {amenity}
              </span>
            ))}
            {listing.amenities.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                +{listing.amenities.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

ListingCard.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    squareFootage: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    amenities: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

ListingCard.defaultProps = {
  listing: {
    images: [],
    amenities: [],
    squareFootage: null
  }
};

export default ListingCard;