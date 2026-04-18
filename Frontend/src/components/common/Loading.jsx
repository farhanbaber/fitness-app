import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Loading = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">UF</span>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-purple-500 border-b-transparent rounded-full animate-spin animation-delay-150"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-pink-500 border-l-transparent rounded-full animate-spin animation-delay-300"></div>
        </div>

        {/* Loading Text */}
        <div className="mt-8">
          <h2 className={`text-2xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Loading Ultra Pro Fitness
          </h2>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Preparing your fitness dashboard...
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-150"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse animation-delay-300"></div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
};

export default Loading;
