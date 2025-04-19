import { Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import PublicPage from '../pages/PublicPage';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ListingsPage from '../pages/listings/ListingsPage';
import ListingDetailPage from '../pages/listings/ListingDetailPage';
import CreateListingPage from '../pages/listings/CreateListingPage';
import EditListingPage from '../pages/listings/EditListingPage';
import CreateReviewPage from '../pages/reviews/CreateReviewPage';
import EditReviewPage from '../pages/reviews/EditReviewPage';
import SearchResultsPage from '../pages/search/SearchResultsPage';
import ProfilePage from '../pages/user/ProfilePage';
import DashboardPage from '../pages/user/DashboardPage';
import ProtectedRoute from '../components/ui/ProtectedRoute';

export const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/public',
    element: <PublicPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/listings',
    element: <ListingsPage />,
  },
  {
    path: '/listings/:id',
    element: <ListingDetailPage />,
  },
  {
    path: '/listings/create',
    element: <ProtectedRoute><CreateListingPage /></ProtectedRoute>,
  },
  {
    path: '/listings/:id/edit',
    element: <ProtectedRoute><EditListingPage /></ProtectedRoute>,
  },
  {
    path: '/listings/:id/review',
    element: <ProtectedRoute><CreateReviewPage /></ProtectedRoute>,
  },
  {
    path: '/reviews/:id/edit',
    element: <ProtectedRoute><EditReviewPage /></ProtectedRoute>,
  },
  {
    path: '/search',
    element: <SearchResultsPage />,
  },
  {
    path: '/profile',
    element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
  },
  {
    path: '/users/me/listings',
    element: <ProtectedRoute><DashboardPage /></ProtectedRoute>,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
];