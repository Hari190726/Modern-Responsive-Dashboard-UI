import React from 'react';
import { MoreHorizontal, TrendingUp, Download, Maximize2 } from 'lucide-react';

const AnalyticsChart: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState('september');
  const [showOptions, setShowOptions] = React.useState(false);
  
  const chartData = [
    { x: 1, y: 45 },
    { x: 5, y: 52 },
    { x: 10, y: 48 },
    { x: 15, y: 58 },
    { x: 20, y: 45 },
    { x: 25, y: 42 },
    { x: 30, y: 55 },
  ];

  const handleAction = (action: string) => {
    console.log(`Analytics chart action: ${action}`);
    setShowOptions(false);
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    console.log('Time range changed to:', range);
  };

  // Create SVG path for the line
  const createPath = (points: { x: number; y: number }[]) => {
    const maxX = Math.max(...points.map(p => p.x));
    const maxY = Math.max(...points.map(p => p.y));
    const minY = Math.min(...points.map(p => p.y));
    
    const width = 200;
    const height = 80;
    
    const scaledPoints = points.map(p => ({
      x: (p.x / maxX) * width,
      y: height - ((p.y - minY) / (maxY - minY)) * height
    }));
    
    let path = `M ${scaledPoints[0].x} ${scaledPoints[0].y}`;
    
    for (let i = 1; i < scaledPoints.length; i++) {
      const current = scaledPoints[i];
      const previous = scaledPoints[i - 1];
      const controlX = (previous.x + current.x) / 2;
      
      path += ` Q ${controlX} ${previous.y} ${current.x} ${current.y}`;
    }
    
    return path;
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Analytical AI</h3>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="september">September 2023</option>
              <option value="october">October 2023</option>
              <option value="november">November 2023</option>
            </select>
            <div className="flex items-center space-x-1 text-sm text-green-400">
              <TrendingUp className="h-3 w-3" />
              <span>+12.5%</span>
            </div>
          </div>
        </div>
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
                onClick={() => handleAction('fullscreen')}
                className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600 flex items-center space-x-2"
              >
                <Maximize2 className="h-4 w-4" />
                <span>Full Screen</span>
              </button>
              <button 
                onClick={() => handleAction('export')}
                className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600 flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chart area */}
      <div className="relative h-24 mb-4 cursor-pointer" onClick={() => handleAction('details')}>
        <svg className="w-full h-full" viewBox="0 0 200 80">
          {/* Gradient definition */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Line chart */}
          <path
            d={createPath(chartData)}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            className="drop-shadow-sm hover:stroke-width-3 transition-all duration-200"
          />
          
          {/* Data points */}
          {chartData.map((point, index) => {
            const maxX = Math.max(...chartData.map(p => p.x));
            const maxY = Math.max(...chartData.map(p => p.y));
            const minY = Math.min(...chartData.map(p => p.y));
            
            const x = (point.x / maxX) * 200;
            const y = 80 - ((point.y - minY) / (maxY - minY)) * 80;
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill="white"
                stroke="#8B5CF6"
                strokeWidth="2"
                className="drop-shadow-sm hover:r-4 cursor-pointer transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Data point clicked:', point);
                }}
              />
            );
          })}
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8">
          <span>60k</span>
          <span>45k</span>
          <span>30k</span>
          <span>15k</span>
          <span>0</span>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-gray-500 px-2">
        {[1, 5, 10, 15, 20, 25, 30].map(day => (
          <span 
            key={day}
            className="cursor-pointer hover:text-white transition-colors duration-200"
            onClick={() => console.log('Day clicked:', day)}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsChart;