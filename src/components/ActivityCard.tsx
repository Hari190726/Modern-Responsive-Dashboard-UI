import React from 'react';
import { MoreHorizontal, TrendingUp, Filter, Eye } from 'lucide-react';

const ActivityCard: React.FC = () => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [selectedActivity, setSelectedActivity] = React.useState<string | null>(null);
  
  const activities = [
    { label: 'Transactions', value: 482, color: 'bg-blue-500' },
    { label: 'Payouts', value: 412, color: 'bg-purple-500' },
    { label: 'Sales', value: 715, color: 'bg-gray-600' },
    { label: 'Reports', value: 128, color: 'bg-orange-500' },
  ];

  const totalValue = activities.reduce((sum, activity) => sum + activity.value, 0);
  
  const handleAction = (action: string) => {
    console.log(`Activity card action: ${action}`);
    setShowOptions(false);
  };

  const handleActivityClick = (activityLabel: string) => {
    setSelectedActivity(selectedActivity === activityLabel ? null : activityLabel);
    console.log('Activity clicked:', activityLabel);
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Activity</h3>
        <div className="relative">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
          
          {showOptions && (
            <div className="absolute right-0 top-8 bg-gray-700 rounded-lg shadow-lg py-2 min-w-[150px] z-10">
              <button 
                onClick={() => handleAction('details')}
                className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600 flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>View Details</span>
              </button>
              <button 
                onClick={() => handleAction('filter')}
                className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600 flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filter Data</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Circular progress chart */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32 cursor-pointer" onClick={() => handleAction('chart')}>
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#374151"
              strokeWidth="8"
            />
            
            {/* Progress circles */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="8"
              strokeDasharray={`${(activities[0].value / totalValue) * 283} 283`}
              strokeDashoffset="0"
              className="transition-all duration-500 hover:stroke-width-10"
            />
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="8"
              strokeDasharray={`${(activities[1].value / totalValue) * 283} 283`}
              strokeDashoffset={`-${(activities[0].value / totalValue) * 283}`}
              className="transition-all duration-500 hover:stroke-width-10"
            />
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#F97316"
              strokeWidth="8"
              strokeDasharray={`${(activities[2].value / totalValue) * 283} 283`}
              strokeDashoffset={`-${((activities[0].value + activities[1].value) / totalValue) * 283}`}
              className="transition-all duration-500 hover:stroke-width-10"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer" onClick={() => handleAction('trend')}>
            <div className="text-2xl font-bold text-white">+13%</div>
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <TrendingUp className="h-3 w-3" />
              <span>Since last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity legend */}
      <div className="space-y-3">
        {activities.map((activity) => (
          <div 
            key={activity.label} 
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedActivity === activity.label 
                ? 'bg-gray-700 ring-2 ring-blue-500' 
                : 'hover:bg-gray-700'
            }`}
            onClick={() => handleActivityClick(activity.label)}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${activity.color}`}></div>
              <span className="text-sm text-gray-300">{activity.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-white">{activity.value}</span>
              <span className="text-xs text-gray-500">
                ({((activity.value / totalValue) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {selectedActivity && (
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-400">
            {selectedActivity} details would be shown here
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;