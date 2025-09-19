import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Mail, 
  Calendar, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Users, label: 'Contacts' },
  { icon: Mail, label: 'Mail' },
  { icon: Calendar, label: 'Calendar' },
  { icon: Settings, label: 'Settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPage, onNavigate }) => {
  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...');
    // You could redirect to login page or clear authentication
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-gray-900 border-r border-gray-800">
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-white">SPECTRA</span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="mt-8 flex-1 px-4 space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => onNavigate(item.label)}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === item.label
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                } w-full text-left`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Logout */}
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="group flex items-center px-3 py-2.5 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Log out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo and close button */}
          <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 bg-gray-900">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-white">SPECTRA</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="mt-8 flex-1 px-4 space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => onNavigate(item.label)}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === item.label
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                } w-full text-left`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Logout */}
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="group flex items-center px-3 py-2.5 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;