import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserProfile from '../../components/user/UserProfile';
import ProfileForm from '../../components/user/ProfileForm';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import  useAuth from '../../hooks/useAuth';
import  useUser from '../../hooks/useUser';

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { getCurrentUser, updateCurrentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError('');
      try {
        await getCurrentUser();
      } catch (err) {
        setError('Failed to load user profile. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, getCurrentUser, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (updatedData) => {
    setSubmitLoading(true);
    setError('');
    try {
      await updateCurrentUser(updatedData);
      setIsEditing(false);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to update profile. Please try again.'
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1>Your Profile</h1>
        {error && <div className="error-message">{error}</div>}
        
        {isLoading ? (
          <LoadingSpinner />
        ) : isEditing ? (
          <ProfileForm 
            user={user}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={submitLoading}
          />
        ) : (
          <UserProfile user={user} onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;