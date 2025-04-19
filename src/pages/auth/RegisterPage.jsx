import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import RegisterForm from '../../components/auth/RegisterForm';
import useAuth from '../../hooks/useAuth';


const RegisterPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (userData) => {
    setLoading(true);
    setError('');
    
    try {
      await register(userData);
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="auth-container">
        <h1>Create an Account</h1>
        {error && <div className="error-message">{error}</div>}
        <RegisterForm onSubmit={handleRegister} isLoading={loading} />
        <div className="auth-links">
          <p>
            {/* Already have an account? <Link to="/login">Login here</Link> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;