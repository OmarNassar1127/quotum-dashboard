import React, { useState, useEffect } from 'react';
import {
  Activity,
  TrendingUp,
  Database,
  FileText,
  AlertCircle,
  Loader
} from 'lucide-react';
import services from '../../services/api';
import { formatDistanceToNow } from 'date-fns';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalCoins: 0,
    totalPosts: 0,
    recentPosts: [],
    recentActivity: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, postsData, activityData] = await Promise.all([
        services.admin.getStats(),
        services.admin.getAllPosts(),
        services.admin.getRecentActivity()
      ]);

      setStats({
        totalCoins: statsData.data.total_coins || 0,
        totalPosts: statsData.data.total_posts || 0,
        recentPosts: postsData.data.slice(0, 5).map(post => ({
          id: post.id,
          title: post.title,
          coinName: post.coin.name,
          timestamp: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }),
          status: post.status
        })),
        recentActivity: activityData.data.slice(0, 5).map(activity => ({
          id: activity.id,
          action: activity.action,
          details: activity.details,
          timestamp: formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })
        }))
      });
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
        <AlertCircle className="h-5 w-5 mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Database className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-900">Total Coins</h3>
            </div>
          </div>
          <p className="mt-4 text-2xl font-semibold text-gray-900">{stats.totalCoins}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-900">Total Posts</h3>
            </div>
          </div>
          <p className="mt-4 text-2xl font-semibold text-gray-900">{stats.totalPosts}</p>
        </div>
      </div>

      {/* Recent Activity and Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
            </div>
          </div>
          <div className="space-y-4">
            {stats.recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{post.title}</p>
                  <p className="text-xs text-gray-500">
                    {post.coinName} • {post.timestamp}
                  </p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {post.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
          </div>
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
