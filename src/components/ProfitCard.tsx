import React from 'react';
import { DollarSign, TrendingUp, MoreHorizontal, Eye, Download } from 'lucide-react';

const ProfitCard: React.FC = () => {
  const [showDetails, setShowDetails] = React.useState(false);
  
  const handleAction = (action: string) => {
    console.log(`Profit card action: ${action}`);
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <DollarSign className="h-5 w-5" />
          </div>
          <h3 className="font-medium">Profit</h3>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
          
          {showDetails && (
            <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg py-2 min-w-[150px] z-10">
              <button 
                onClick={() => handleAction('view')}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>View Details</span>
              </button>
              <button 
                onClick={() => handleAction('export')}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profit illustration */}
      <div className="mb-6 flex justify-center">
        <div className="relative cursor-pointer" onClick={() => handleAction('view')}>
          <div className="w-32 h-20 bg-white/10 rounded-lg flex items-center justify-center">
            <div className="text-4xl">📊</div>
          </div>
        </div>
      </div>

      {/* Profit stats */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm cursor-pointer" onClick={() => handleAction('trend')}>
          <TrendingUp className="h-4 w-4 text-green-300" />
          <span className="text-green-300">+14%</span>
          <span className="text-white/80">Since last week</span>
        </div>
        <div className="text-3xl font-bold cursor-pointer" onClick={() => handleAction('details')}>
          $12,895.5
        </div>
      </div>
    </div>
  );
};

export default ProfitCard;