import React from 'react';
import { Search, Bell, Menu, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  notifications: Array<{ id: number; read: boolean }>;
  onNotificationClick: () => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onMenuClick, 
  onSearch, 
  searchQuery, 
  notifications, 
  onNotificationClick,
  currentPage 
}) => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Implement theme switching logic
    console.log('Theme toggled:', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu button and title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-white hidden sm:block">{currentPage}</h1>
        </div>

        {/* Right side - Search, notifications, theme toggle, and user profile */}
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search here..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </form>

          {/* Theme toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <button 
            onClick={onNotificationClick}
            className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* User profile */}
          <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200">
            <img
              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="User"
              className="h-8 w-8 rounded-full object-cover border-2 border-gray-700"
            />
            <div className="hidden md:block">
              <div className="text-sm font-medium text-white">John Doe</div>
              <div className="text-xs text-gray-400">Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;