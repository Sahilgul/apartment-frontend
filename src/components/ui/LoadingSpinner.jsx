import React from 'react';

const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
  // Size variant classes
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  // Container classes
  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'
    : 'flex items-center justify-center py-10';

  return (
    <div className={containerClasses}>
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="h-full w-full rounded-full border-4 border-gray-200 border-t-blue-600"></div>
      </div>
      {fullScreen && (
        <p className="ml-4 text-lg font-medium text-gray-700">Loading...</p>
      )}
    </div>
  );
};

export default LoadingSpinner;