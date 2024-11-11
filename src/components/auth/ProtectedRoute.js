import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin, isActive } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isActive()) {
    return <div className="p-6 text-center">
      <h2 className="text-xl font-semibold text-red-600">Account Not Activated</h2>
      <p className="mt-2 text-gray-600">Please wait for an administrator to activate your account.</p>
    </div>;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
