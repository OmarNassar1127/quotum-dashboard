import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  // Temporary mock user state until we implement auth context
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center text-gray-900 font-semibold">
                Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link to="/portfolio" className="text-gray-600 hover:text-gray-900">
                    Portfolio
                  </Link>
                  <Link to="/videos" className="text-gray-600 hover:text-gray-900">
                    Videos
                  </Link>
                  <Link to="/help" className="text-gray-600 hover:text-gray-900">
                    Help
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-blue-600 hover:text-blue-800 font-medium">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-gray-900">
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-600 hover:text-gray-900">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
