import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import LoginForm from '../../components/auth/LoginForm';
import useAuth from '../../hooks/useAuth';


const LoginPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError('');
    
    try {
      await login(credentials);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to login. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        <h1>Login to Your Account</h1>
        {error && <div className="error-message">{error}</div>}
        <LoginForm onSubmit={handleLogin} isLoading={loading} />
        <div className="auth-links">
          <p>
            {/* Don't have an account? <Link to="/register">Register here</Link> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;