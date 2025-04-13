import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from './routes/AppRoutes';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import { fetchCurrentUser } from './store/slices/authSlice';
import { isAuthenticated } from './utils/auth';

function App() {
  const dispatch = useDispatch();

  // Check authentication status and fetch user data on app load
  useEffect(() => {
    const initializeAuth = async () => {
      if (isAuthenticated()) {
        try {
          await dispatch(fetchCurrentUser()).unwrap();
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };

    initializeAuth();
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <AppRoutes />
        </main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;