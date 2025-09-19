import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Calendar, Filter } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const metrics = [
    { id: 'revenue', label: 'Revenue', value: '$45,231', change: '+12.5%', trend: 'up' },
    { id: 'users', label: 'Active Users', value: '12,543', change: '+8.2%', trend: 'up' },
    { id: 'conversion', label: 'Conversion Rate', value: '3.24%', change: '-2.1%', trend: 'down' },
    { id: 'sessions', label: 'Sessions', value: '89,432', change: '+15.3%', trend: 'up' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">Detailed insights and performance metrics</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="revenue">Revenue</option>
            <option value="users">Users</option>
            <option value="conversion">Conversion</option>
            <option value="sessions">Sessions</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className={`bg-gray-800 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:bg-gray-700 ${
              selectedMetric === metric.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedMetric(metric.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">{metric.label}</h3>
              {metric.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </div>
            <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
            <div className={`text-sm ${
              metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {metric.change} from last period
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            {metrics.find(m => m.id === selectedMetric)?.label} Trend
          </h3>
          <div className="text-sm text-gray-400">Time Range: {timeRange}</div>
        </div>
        
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Interactive chart would be rendered here</p>
            <p className="text-sm text-gray-500 mt-2">
              Showing {selectedMetric} data for {timeRange}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;