import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MetricsCard = ({ title, value, change, trend, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600',
  };

  const trendColor = trend === 'up' ? 'text-green-400' : 'text-red-400';
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colorClasses[color]}`} />
      </div>
      
      <div className="space-y-2">
        <p className="text-2xl lg:text-3xl font-bold text-white">{value}</p>
        <div className="flex items-center space-x-1">
          <TrendIcon className={`w-4 h-4 ${trendColor}`} />
          <span className={`text-sm font-medium ${trendColor}`}>
            {change}
          </span>
          <span className="text-gray-500 text-sm">vs last period</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;