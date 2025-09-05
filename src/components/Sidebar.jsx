import React from 'react';
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  MessageSquare,
  TrendingUp,
  Calendar,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Analytics' },
    { icon: TrendingUp, label: 'Reports' },
    { icon: Users, label: 'Users' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: Calendar, label: 'Calendar' },
    { icon: Bell, label: 'Notifications' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 
        bg-gray-900/95 backdrop-blur-sm border-r border-gray-700/50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AnalyFlow</span>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${item.active 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-700/50">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">John Doe</p>
                <p className="text-gray-400 text-sm truncate">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;