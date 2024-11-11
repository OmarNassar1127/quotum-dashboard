import React from 'react';
import {
  Clock,
  Activity,
  CheckCircle,
  TrendingUp,
  FileText,
  User,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard = () => {
  // Placeholder data for recent content
  const recentContent = [
    { id: 1, title: 'Getting Started Guide', timestamp: '2 hours ago', status: 'published' },
    { id: 2, title: 'Market Analysis Q1', timestamp: '5 hours ago', status: 'draft' },
    { id: 3, title: 'Investment Strategy', timestamp: '1 day ago', status: 'published' },
  ];

  // Placeholder data for recent activity
  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'created a new post', timestamp: '1 hour ago' },
    { id: 2, user: 'Jane Smith', action: 'updated portfolio', timestamp: '3 hours ago' },
    { id: 3, user: 'Mike Johnson', action: 'added new video', timestamp: '5 hours ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Top Content Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Content Box */}
        <div className="bg-white rounded-lg shadow-sm p-6 min-h-[24rem]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Recent Content</h2>
            </div>
          </div>
          <div className="space-y-4">
            {recentContent.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.timestamp}</p>
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

        {/* Recent Activity Box */}
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

      {/* Bottom Metric Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects Completed Box */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Projects Completed</h2>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              12%
            </span>
          </div>
          <p className="mt-4 text-4xl font-bold text-gray-900">24</p>
          <p className="text-sm text-gray-500 mt-1">Projects this month</p>
        </div>

        {/* Performance Metrics Box */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              3%
            </span>
          </div>
          <p className="mt-4 text-4xl font-bold text-gray-900">89%</p>
          <p className="text-sm text-gray-500 mt-1">Average performance</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
