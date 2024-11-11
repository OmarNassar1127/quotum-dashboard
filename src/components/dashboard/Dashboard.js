import React, { useState, useEffect } from 'react';
import {
  Clock,
  Activity,
  CheckCircle,
  TrendingUp,
  FileText,
  User,
  ArrowUpRight,
  ArrowDownRight,
  Loader
} from 'lucide-react';
import services from '../../services/api';
import { formatDistanceToNow } from 'date-fns';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentContent, setRecentContent] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    projectsCompleted: 0,
    projectsGrowth: 0,
    performance: 0,
    performanceChange: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [contentData, activityData, statsData] = await Promise.all([
          services.dashboard.getRecentContent(),
          services.dashboard.getRecentActivity(),
          services.dashboard.getStats()
        ]);

        setRecentContent(contentData.map(item => ({
          id: item.id,
          title: item.title,
          timestamp: formatDistanceToNow(new Date(item.created_at), { addSuffix: true }),
          status: item.status,
          coinName: item.coin?.name || 'Unknown Coin',
          images: item.images || []
        })));

        setRecentActivity(activityData.map(item => ({
          id: item.id,
          user: item.user,
          action: item.action,
          timestamp: formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })
        })));

        setStats({
          projectsCompleted: statsData.completed_projects,
          projectsGrowth: statsData.projects_growth,
          performance: statsData.performance,
          performanceChange: statsData.performance_change
        });
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 min-h-[24rem]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Recent Content</h2>
            </div>
          </div>
          <div className="space-y-4">
            {recentContent.map((item) => (
              <div key={item.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.coinName}</p>
                    <p className="text-xs text-gray-500">{item.timestamp}</p>
                    {item.images && item.images.length > 0 && (
                      <div className="mt-2 flex space-x-2 overflow-x-auto">
                        {item.images.slice(0, 3).map((image, index) => (
                          <img
                            key={index}
                            src={image.url}
                            alt={`${item.title} image ${index + 1}`}
                            className="h-12 w-12 object-cover rounded"
                          />
                        ))}
                        {item.images.length > 3 && (
                          <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded">
                            <span className="text-xs text-gray-500">+{item.images.length - 3}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 min-h-[24rem]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {item.user} <span className="text-gray-500">{item.action}</span>
                  </p>
                  <p className="text-xs text-gray-500">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Projects Completed</h2>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
              stats.projectsGrowth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {stats.projectsGrowth >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {Math.abs(stats.projectsGrowth)}%
            </span>
          </div>
          <p className="mt-4 text-4xl font-bold text-gray-900">{stats.projectsCompleted}</p>
          <p className="text-sm text-gray-500 mt-1">Projects this month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
              stats.performanceChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {stats.performanceChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {Math.abs(stats.performanceChange)}%
            </span>
          </div>
          <p className="mt-4 text-4xl font-bold text-gray-900">{stats.performance}%</p>
          <p className="text-sm text-gray-500 mt-1">Average performance</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
