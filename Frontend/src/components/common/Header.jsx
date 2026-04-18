import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  HomeIcon, 
  UserIcon, 
  SettingsIcon, 
  LogoutIcon,
  BellIcon 
} from 'lucide-react';

const Header = ({ user }) => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className={`${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    } border-b transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Time */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">UF</span>
              </div>
              <span className={`${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              } font-bold text-xl`}>
                Ultra Pro Fitness
              </span>
            </div>
            
            {/* Real-time Date/Time Display */}
            <div className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            } text-sm font-medium`}>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a 
              href="/dashboard" 
              className={`${
                theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Dashboard
            </a>
            <a 
              href="/workouts" 
              className={`${
                theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Workouts
            </a>
            <a 
              href="/nutrition" 
              className={`${
                theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Nutrition
            </a>
            <a 
              href="/cardio-swimming" 
              className={`${
                theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Cardio & Swimming
            </a>
          </nav>

          {/* Right side - User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifications([])}
                className={`p-2 rounded-full ${
                  theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                } transition-colors`}
              >
                <BellIcon className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              } transition-colors`}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-1h7a1 1 0 110-1V9a1 1 0 00-1-1H4a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.586 0l-4.293-4.293a1 1 0 00-1.414 1.414L10 15.586l4.293-4.293a1 1 0 001.414 1.414L17.586 11a1 1 0 00-1.293-1.293z" />
                </svg>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                className={`flex items-center space-x-3 p-2 rounded-full ${
                  theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                } transition-colors`}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                } text-sm font-medium`}>
                  {user?.username}
                </span>
              </button>

              {/* Dropdown Menu */}
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border`}>
                <div className="py-1">
                  <a
                    href="/profile"
                    className={`flex items-center px-4 py-2 text-sm ${
                      theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors`}
                  >
                    <UserIcon className="w-4 h-4 mr-3" />
                    Profile
                  </a>
                  <a
                    href="/settings"
                    className={`flex items-center px-4 py-2 text-sm ${
                      theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors`}
                  >
                    <SettingsIcon className="w-4 h-4 mr-3" />
                    Settings
                  </a>
                  <button
                    onClick={logout}
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors`}
                  >
                    <LogoutIcon className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
      } border-t`}>
        <div className="px-2 pt-2 pb-3 space-x-1 flex">
          <a
            href="/dashboard"
            className={`flex-1 text-center px-3 py-2 rounded-md text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
            } transition-colors`}
          >
            Dashboard
          </a>
          <a
            href="/workouts"
            className={`flex-1 text-center px-3 py-2 rounded-md text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
            } transition-colors`}
          >
            Workouts
          </a>
          <a
            href="/nutrition"
            className={`flex-1 text-center px-3 py-2 rounded-md text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
            } transition-colors`}
          >
            Nutrition
          </a>
          <a
            href="/cardio-swimming"
            className={`flex-1 text-center px-3 py-2 rounded-md text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
            } transition-colors`}
          >
            Cardio
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
