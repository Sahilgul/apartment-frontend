import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorBoundary from '../ui/ErrorBoundary';
import ProfileForm from './ProfileForm';

const UserProfile = () => {
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Redirect to login if not authenticated (should be handled by ProtectedRoute already)
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!user) {
    return null; // Should be handled by useEffect redirect
  }

  // Extract the actual user data from the Axios response
  const userData = user.data || {};

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {!isEditing ? (
            // Profile view mode
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </div>

              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                  <span className="text-3xl text-gray-600">
                    {userData.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">{userData.username}</h2>
                  <p className="text-gray-600">{userData.email}</p>
                  <p className="text-gray-500 capitalize">{userData.role}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium mb-3">Account Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Username</p>
                    <p className="font-medium">{userData.username}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email Address</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Account Type</p>
                    <p className="font-medium capitalize">{userData.role}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Member Since</p>
                    <p className="font-medium">
                      {userData.created_at && new Date(userData.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Profile edit mode
            <ProfileForm user={userData} onCancel={() => setIsEditing(false)} onSuccess={() => setIsEditing(false)} />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default UserProfile;