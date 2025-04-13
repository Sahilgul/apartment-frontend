import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
// import { useAuth } from '../../hooks/useAuth';
// import {useAuth} from '../../hooks/useAuth';

import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            ApartmentFinder
          </Link>
          <div className="hidden md:block">
            <Navbar />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/auth/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link 
                to="/auth/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <Link to="/user/profile" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-sm">
                  {/* User's initials or icon could go here */}
                  U
                </span>
              </div>
              <span className="hidden md:inline text-gray-700">My Profile</span>
            </Link>
          )}
          <button className="md:hidden text-gray-700">
            {/* Mobile menu button - could be implemented with icons/state */}
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;