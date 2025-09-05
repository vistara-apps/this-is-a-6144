import React from 'react';
import { 
  Bell, 
  User, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  X,
  MoreHorizontal
} from 'lucide-react';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'user',
      icon: User,
      title: 'New user registered',
      description: 'Sarah Johnson joined the platform',
      time: '2 minutes ago',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      id: 2,
      type: 'metric',
      icon: TrendingUp,
      title: 'Revenue milestone reached',
      description: 'Monthly target achieved (105%)',
      time: '15 minutes ago',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      id: 3,
      type: 'alert',
      icon: AlertCircle,
      title: 'Server response time high',
      description: 'Average response time: 2.3s',
      time: '32 minutes ago',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    },
    {
      id: 4,
      type: 'success',
      icon: CheckCircle,
      title: 'Backup completed',
      description: 'Daily backup finished successfully',
      time: '1 hour ago',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      id: 5,
      type: 'user',
      icon: User,
      title: 'User activity spike',
      description: '247 new sessions in the last hour',
      time: '2 hours ago',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
    {
      id: 6,
      type: 'alert',
      icon: AlertCircle,
      title: 'API rate limit warning',
      description: '85% of daily quota used',
      time: '3 hours ago',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10'
    }
  ];

  return (
    <div className="h-full bg-gray-900/50 backdrop-blur-sm border-l border-gray-700/50">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Activity Feed</h2>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-1">Real-time updates and notifications</p>
      </div>

      {/* Activity List */}
      <div className="p-4 lg:p-6 space-y-4 overflow-auto h-full scroll-hide">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-200 border border-gray-700/30"
          >
            <div className={`p-2 rounded-lg ${activity.bgColor} flex-shrink-0`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm leading-5">
                    {activity.title}
                  </h4>
                  <p className="text-gray-400 text-sm mt-1 leading-5">
                    {activity.description}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    {activity.time}
                  </p>
                </div>
                <button className="text-gray-500 hover:text-gray-300 transition-colors ml-2 flex-shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Load More */}
        <div className="text-center pt-4">
          <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
            Load more activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;