import React from 'react';
import { NavLink } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
import useAuth from '../../hooks/useAuth';


const Navbar = () => {
  const { isAuthenticated, user } = useAuth();

  const activeStyle = "text-blue-600 font-medium";
  const normalStyle = "text-gray-700 hover:text-blue-600";

  return (
    <nav className="flex items-center space-x-6">
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? activeStyle : normalStyle}
        end
      >
        Home
      </NavLink>
      
      <NavLink 
        to="/listings" 
        className={({ isActive }) => isActive ? activeStyle : normalStyle}
      >
        Apartments
      </NavLink>
      
      {isAuthenticated && (
        <>
          <NavLink 
            to="/users/me/listings" 
            className={({ isActive }) => isActive ? activeStyle : normalStyle}
          >
            Dashboard
          </NavLink>
          
          {user?.role === 'landlord' && (
            <NavLink 
              to="/listings/create" 
              className={({ isActive }) => isActive ? activeStyle : normalStyle}
            >
              List Property
            </NavLink>
          )}
        </>
      )}
      
      <NavLink 
        to="/search" 
        className={({ isActive }) => isActive ? activeStyle : normalStyle}
      >
        Search
      </NavLink>
    </nav>
  );
};

export default Navbar;