import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorBoundary from '../ui/ErrorBoundary';

const UserListings = () => {
  const { getUserListings, deleteUserListing, loading, error } = useUser();
  const [listings, setListings] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getUserListings();
        setListings(data || []);
      } catch (err) {
        console.error('Failed to fetch user listings:', err);
      }
    };

    fetchListings();
  }, [getUserListings]);

  const handleDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        await deleteUserListing(listingId);
        setListings(listings.filter(listing => listing.id !== listingId));
      } catch (err) {
        console.error('Failed to delete listing:', err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (loading && !listings.length) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
        <p>Error loading your listings. Please try again later.</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Listings</h2>
          <Link
            to="/listings/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add New Listing
          </Link>
        </div>

        {isDeleting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {listings.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600 mb-4">You don't have any listings yet.</p>
            <Link
              to="/listings/create"
              className="text-blue-600 hover:underline"
            >
              Create your first listing
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 bg-gray-200">
                  {listing.photos && listing.photos.length > 0 ? (
                    <img
                      src={listing.photos[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 truncate">
                    {listing.title}
                  </h3>
                  <p className="text-gray-600 mb-2">${listing.price}/month</p>
                  <p className="text-gray-500 mb-2 text-sm">
                    {listing.bedrooms} beds • {listing.bathrooms} baths • {listing.city}, {listing.state}
                  </p>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/listings/${listing.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <div className="space-x-3">
                      <Link
                        to={`/listings/edit/${listing.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default UserListings;