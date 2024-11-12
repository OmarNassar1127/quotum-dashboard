import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import Portfolio from './components/portfolio/Portfolio';
import Videos from './components/videos/Videos';
import CoinDetail from './components/portfolio/CoinDetail';
import CoinManagement from './components/admin/CoinManagement';
import PostManagement from './components/admin/PostManagement';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="coins" element={<CoinManagement />} />
          <Route path="posts" element={<PostManagement />} />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Route>

        {/* Protected User Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="coin/:coinId" element={<CoinDetail />} />
          <Route path="videos" element={<Videos />} />
          <Route path="help" element={<div>Help Page</div>} />
        </Route>

        {/* Redirect unknown routes to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
