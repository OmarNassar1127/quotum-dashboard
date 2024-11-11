import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-semibold text-gray-800">
                Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/portfolio" className="text-gray-600 hover:text-gray-900">
                Portfolio
              </Link>
              <Link to="/videos" className="text-gray-600 hover:text-gray-900">
                Videos
              </Link>
              <Link to="/help" className="text-gray-600 hover:text-gray-900">
                Help
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
