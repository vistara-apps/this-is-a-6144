import React from 'react';
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const DataTable = () => {
  const data = [
    {
      id: 1,
      page: '/dashboard',
      visitors: 2847,
      change: 12.5,
      trend: 'up',
      bounce: '32%'
    },
    {
      id: 2,
      page: '/analytics',
      visitors: 1924,
      change: -3.2,
      trend: 'down',
      bounce: '45%'
    },
    {
      id: 3,
      page: '/reports',
      visitors: 1567,
      change: 8.7,
      trend: 'up',
      bounce: '38%'
    },
    {
      id: 4,
      page: '/settings',
      visitors: 892,
      change: 15.3,
      trend: 'up',
      bounce: '52%'
    },
    {
      id: 5,
      page: '/users',
      visitors: 743,
      change: -5.1,
      trend: 'down',
      bounce: '41%'
    }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Top Pages</h3>
          <p className="text-gray-400 text-sm mt-1">Most visited pages this week</p>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700/50">
              <th className="text-left text-gray-400 font-medium text-sm pb-3">Page</th>
              <th className="text-left text-gray-400 font-medium text-sm pb-3">Visitors</th>
              <th className="text-left text-gray-400 font-medium text-sm pb-3">Change</th>
              <th className="text-left text-gray-400 font-medium text-sm pb-3">Bounce Rate</th>
            </tr>
          </thead>
          <tbody className="space-y-3">
            {data.map((item) => (
              <tr key={item.id} className="border-b border-gray-700/30 last:border-b-0">
                <td className="py-4">
                  <span className="text-white font-medium">{item.page}</span>
                </td>
                <td className="py-4">
                  <span className="text-gray-300">{item.visitors.toLocaleString()}</span>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-1">
                    {item.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`text-sm font-medium ${
                      item.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-gray-300">{item.bounce}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;