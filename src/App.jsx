import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ActivityFeed from './components/ActivityFeed';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Dashboard */}
            <div className="flex-1 overflow-auto">
              <Dashboard onMenuClick={() => setIsSidebarOpen(true)} />
            </div>
            
            {/* Activity Feed */}
            <div className="w-full lg:w-80 border-l border-gray-700/50">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
