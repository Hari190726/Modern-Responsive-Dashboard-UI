import React from 'react';
import ProfitCard from '../components/ProfitCard';
import SalesReport from '../components/SalesReport';
import AnalyticsChart from '../components/AnalyticsChart';
import InvoicesTable from '../components/InvoicesTable';
import ActivityCard from '../components/ActivityCard';

interface DashboardProps {
  searchQuery: string;
}

const Dashboard: React.FC<DashboardProps> = ({ searchQuery }) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Overview</h1>
        <p className="text-gray-400">Welcome back to your dashboard</p>
        {searchQuery && (
          <p className="text-sm text-blue-400 mt-2">
            Searching for: "{searchQuery}"
          </p>
        )}
      </div>
      
      {/* Dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {/* Profit card - spans 1 column */}
        <div className="lg:col-span-1">
          <ProfitCard />
        </div>
        
        {/* Sales report - spans 1 column */}
        <div className="lg:col-span-1">
          <SalesReport />
        </div>
        
        {/* Analytics chart - spans 1 column */}
        <div className="lg:col-span-1">
          <AnalyticsChart />
        </div>
        
        {/* Activity card - spans 1 column */}
        <div className="lg:col-span-1 xl:col-span-1">
          <ActivityCard />
        </div>
      </div>
      
      {/* Invoices table - full width */}
      <div className="mb-8">
        <InvoicesTable searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Dashboard;