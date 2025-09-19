import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Contacts from './pages/Contacts';
import Mail from './pages/Mail';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import NotificationPanel from './components/NotificationPanel';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New invoice received', message: 'Invoice #001423 from Arlene McCoy', time: '2 min ago', read: false },
    { id: 2, title: 'Payment processed', message: 'Payment of $3,230.2 has been processed', time: '1 hour ago', read: false },
    { id: 3, title: 'Weekly report ready', message: 'Your weekly analytics report is ready', time: '3 hours ago', read: true },
    { id: 4, title: 'System maintenance', message: 'Scheduled maintenance tonight at 2 AM', time: '1 day ago', read: true },
  ]);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
    console.log('Searching for:', query);
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard searchQuery={searchQuery} />;
      case 'Analytics':
        return <Analytics />;
      case 'Contacts':
        return <Contacts searchQuery={searchQuery} />;
      case 'Mail':
        return <Mail />;
      case 'Calendar':
        return <Calendar />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigation}
      />
      
      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top navigation */}
        <Navbar 
          onMenuClick={() => setSidebarOpen(true)}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          notifications={notifications}
          onNotificationClick={() => setNotificationsOpen(true)}
          currentPage={currentPage}
        />
        
        {/* Page content */}
        <main className="p-4 lg:p-8 min-h-screen">
          {renderCurrentPage()}
        </main>
      </div>
      
      {/* Notification Panel */}
      <NotificationPanel
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={markNotificationAsRead}
        onClearAll={clearAllNotifications}
      />
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;