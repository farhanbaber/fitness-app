import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import {
  HomeIcon,
  DumbbellIcon,
  UtensilsIcon,
  ActivityIcon,
  UserIcon,
  SettingsIcon,
  DownloadIcon,
  ChartBarIcon
} from 'lucide-react';

const Sidebar = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: HomeIcon,
      path: '/dashboard',
      description: 'Overview and stats'
    },
    {
      id: 'workouts',
      label: 'Workout Planner',
      icon: DumbbellIcon,
      path: '/workouts',
      description: 'Gym training programs'
    },
    {
      id: 'nutrition',
      label: 'Nutrition',
      icon: UtensilsIcon,
      path: '/nutrition',
      description: 'Diet and meal planning'
    },
    {
      id: 'cardio-swimming',
      label: 'Cardio & Swimming',
      icon: ActivityIcon,
      path: '/cardio-swimming',
      description: 'Cardio programs'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: UserIcon,
      path: '/profile',
      description: 'User profile and progress'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: SettingsIcon,
      path: '/settings',
      description: 'App settings'
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={`w-64 ${
      theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    } border-r transition-all duration-300`}>
      {/* User Profile Section */}
      <div className={`p-6 border-b ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className={`font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {user?.username}
            </div>
            <div className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {user?.profile?.fitnessLevel || 'Beginner'}
            </div>
            <div className={`text-xs ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Goal: {user?.profile?.goal?.replace('_', ' ') || 'General Fitness'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? theme === 'dark'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-blue-500 text-white shadow-lg'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-xs ${
                      isActive(item.path)
                        ? 'text-blue-100'
                        : theme === 'dark'
                          ? 'text-gray-500'
                          : 'text-gray-500'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quick Actions */}
      <div className={`p-4 border-t ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className={`text-xs font-semibold mb-3 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        } uppercase tracking-wider`}>
          Quick Actions
        </div>
        <div className="space-y-2">
          <button
            onClick={() => window.open('/api/download/schedule/weekly/pdf', '_blank')}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Download Schedule</span>
          </button>
          <button
            onClick={() => navigate('/profile')}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            <ChartBarIcon className="w-4 h-4" />
            <span>View Progress</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className={`p-4 border-t ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className={`text-xs font-semibold mb-3 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        } uppercase tracking-wider`}>
          Today's Stats
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Calories Burned
            </span>
            <span className={`text-sm font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              420 kcal
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Active Minutes
            </span>
            <span className={`text-sm font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              45 min
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Workout Streak
            </span>
            <span className={`text-sm font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              7 days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
