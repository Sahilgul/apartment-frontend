import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ isOpen, onClose, initialMode = 'login', onSuccess }) => {
  const [mode, setMode] = useState(initialMode);
  
  // Reset mode when modal is reopened
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);
  
  // Handle successful authentication
  const handleAuthSuccess = (data) => {
    if (onSuccess) {
      onSuccess(data);
    }
    onClose();
  };
  
  // Toggle between login and register forms
  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          {/* Close button */}
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Modal content */}
          <div className="px-4 py-5 sm:p-6">
            {mode === 'login' ? (
              <LoginForm 
                onSuccess={handleAuthSuccess} 
                onRegisterClick={toggleMode} 
              />
            ) : (
              <RegisterForm 
                onSuccess={handleAuthSuccess} 
                onLoginClick={toggleMode} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;