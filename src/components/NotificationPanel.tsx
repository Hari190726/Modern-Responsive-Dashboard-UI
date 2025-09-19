import React from 'react';
import { X, Check, CheckCheck } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onClearAll: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onClearAll
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-gray-900 border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
            <p className="text-sm text-gray-400">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={onClearAll}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
                title="Mark all as read"
              >
                <CheckCheck className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <div className="text-4xl mb-4">🔔</div>
              <p>No notifications</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-gray-800 ${
                    notification.read
                      ? 'bg-gray-800/50 border-gray-700'
                      : 'bg-blue-500/10 border-blue-500/30'
                  }`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`text-sm font-medium ${
                          notification.read ? 'text-gray-300' : 'text-white'
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className={`text-sm ${
                        notification.read ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkAsRead(notification.id);
                        }}
                        className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200"
                        title="Mark as read"
                      >
                        <Check className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;