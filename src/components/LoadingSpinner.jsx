import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'purple', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const colorClasses = {
    purple: 'border-purple-500',
    blue: 'border-blue-500',
    green: 'border-green-500',
    white: 'border-white'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`
        ${sizeClasses[size]} 
        border-2 border-gray-300 border-t-2 ${colorClasses[color]} 
        rounded-full animate-spin
      `} />
      {text && (
        <p className="text-gray-400 text-sm font-medium">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
