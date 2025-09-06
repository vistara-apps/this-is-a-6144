import React from 'react';
import { Menu, Search, Bell, Download } from 'lucide-react';
import MetricsCard from './MetricsCard';
import ChartCard from './ChartCard';
import DataTable from './DataTable';
import ExportButton from './ExportButton';
import LoadingSpinner from './LoadingSpinner';

const Dashboard = ({ onMenuClick }) => {
  return (
    <div className="h-full bg-gray-900/50 backdrop-blur-sm">
      {/* Header */}
      <header className="bg-gray-900/70 backdrop-blur-sm border-b border-gray-700/50 p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onMenuClick}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Good Morning, Building</h1>
              <p className="text-gray-400 text-sm mt-1">Here's what's happening today</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <ExportButton 
              data={[
                { metric: 'Total Users', value: '24,567', change: '+12.5%' },
                { metric: 'Revenue', value: '$45,678', change: '+8.2%' },
                { metric: 'Conversion Rate', value: '3.24%', change: '-2.1%' },
                { metric: 'Sessions', value: '12,543', change: '+15.3%' }
              ]}
              filename="dashboard-metrics"
            />
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="p-4 lg:p-6 space-y-6 overflow-auto h-full">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <MetricsCard
            title="Total Users"
            value="24,567"
            change="+12.5%"
            trend="up"
            color="blue"
          />
          <MetricsCard
            title="Revenue"
            value="$45,678"
            change="+8.2%"
            trend="up"
            color="green"
          />
          <MetricsCard
            title="Conversion Rate"
            value="3.24%"
            change="-2.1%"
            trend="down"
            color="red"
          />
          <MetricsCard
            title="Sessions"
            value="12,543"
            change="+15.3%"
            trend="up"
            color="purple"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <ChartCard
            title="Revenue Overview"
            type="area"
            timeframe="Last 7 days"
          />
          <ChartCard
            title="User Activity"
            type="bar"
            timeframe="This month"
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2">
            <DataTable />
          </div>
          <ChartCard
            title="Traffic Sources"
            type="pie"
            timeframe="Today"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
