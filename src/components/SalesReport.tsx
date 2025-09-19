import React from 'react';
import { MoreHorizontal, Filter, Download } from 'lucide-react';

const SalesReport: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = React.useState('week');
  const [showOptions, setShowOptions] = React.useState(false);
  
  const weekData = [
    { day: 'Sun', earnings: 60, payments: 40 },
    { day: 'Mon', earnings: 80, payments: 60 },
    { day: 'Tue', earnings: 70, payments: 50 },
    { day: 'Wed', earnings: 90, payments: 70 },
    { day: 'Thu', earnings: 100, payments: 85 }, // Thursday highlighted
    { day: 'Fri', earnings: 85, payments: 65 },
    { day: 'Sat', earnings: 75, payments: 55 },
  ];

  const maxValue = Math.max(...weekData.map(d => Math.max(d.earnings, d.payments)));

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    console.log('Period changed to:', period);
  };

  const handleAction = (action: string) => {
    console.log(`Sales report action: ${action}`);
    setShowOptions(false);
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Sales Report</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-400">Earnings</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <span className="text-gray-400">Payments</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="quarter">Quarter</option>
            </select>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            
            {showOptions && (
              <div className="absolute right-0 top-8 bg-gray-700 rounded-lg shadow-lg py-2 min-w-[150px] z-10">
                <button 
                  onClick={() => handleAction('filter')}
                  className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600 flex items-center space-x-2"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter Data</span>
                </button>
                <button 
                  onClick={() => handleAction('export')}
                  className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600 flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export Chart</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end justify-between h-32 space-x-2">
        {weekData.map((data) => (
          <div 
            key={data.day} 
            className="flex flex-col items-center space-y-1 flex-1 cursor-pointer group"
            onClick={() => console.log('Day clicked:', data.day)}
          >
            <div className="flex flex-col items-center space-y-1 h-24 justify-end">
              {/* Earnings bar */}
              <div 
                className={`w-4 ${data.day === 'Thu' ? 'bg-orange-500' : 'bg-gray-600'} rounded-t transition-all duration-300 group-hover:opacity-80`}
                style={{ 
                  height: `${(data.earnings / maxValue) * 100}%`,
                  minHeight: '8px'
                }}
              ></div>
              {/* Payments bar */}
              <div 
                className="w-4 bg-gray-700 rounded-b group-hover:opacity-80 transition-all duration-300"
                style={{ 
                  height: `${(data.payments / maxValue) * 100}%`,
                  minHeight: '6px'
                }}
              ></div>
            </div>
            <span className="text-xs text-gray-400 mt-2 group-hover:text-white transition-colors duration-200">
              {data.day}
            </span>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-400">15k</div>
        <div className="text-xs text-gray-500 mt-1">10k</div>
        <div className="text-xs text-gray-500">5k</div>
        <div className="text-xs text-gray-500">0</div>
      </div>
    </div>
  );
};

export default SalesReport;