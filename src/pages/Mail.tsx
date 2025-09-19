import React, { useState } from 'react';
import { Plus, Archive, Trash2, Star, Reply, Forward, MoreHorizontal } from 'lucide-react';

interface Email {
  id: number;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  time: string;
  read: boolean;
  starred: boolean;
  avatar: string;
}

const Mail: React.FC = () => {
  const [emails] = useState<Email[]>([
  {
    id: 1,
    sender: 'Harini',
    senderEmail: 'harini.@example.com',
    subject: 'Project Update - Q4 Review',
    preview: 'Hi team, I wanted to share the latest updates on our Q4 project milestones...',
    time: '2 hours ago',
    read: false,
    starred: true,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    sender: 'Suresh Kumar',
    senderEmail: 'suresh.kumar@example.com',
    subject: 'Design Review Meeting',
    preview: 'The design review meeting has been scheduled for tomorrow at 2 PM...',
    time: '4 hours ago',
    read: true,
    starred: false,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    sender: 'Marketing Team - Chennai',
    senderEmail: 'marketing@chennaicompany.com',
    subject: 'Weekly Newsletter - Analytics Report',
    preview: 'This week\'s performance metrics show significant improvement in user engagement...',
    time: '1 day ago',
    read: true,
    starred: false,
    avatar: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    sender: 'Anandhi Raj',
    senderEmail: 'anand.raj@example.com',
    subject: 'Invoice #TN001423 - Payment Confirmation',
    preview: 'Thank you for your payment. Your invoice has been processed successfully...',
    time: '2 days ago',
    read: false,
    starred: true,
    avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
]);


  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred'>('all');

  const filteredEmails = emails.filter(email => {
    switch (filter) {
      case 'unread':
        return !email.read;
      case 'starred':
        return email.starred;
      default:
        return true;
    }
  });

  const handleEmailAction = (action: string, emailId: number) => {
    console.log(`${action} email:`, emailId);
  };

  const toggleStar = (emailId: number) => {
    console.log('Toggle star for email:', emailId);
  };

  return (
    <div className="h-full">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Mail</h1>
        <p className="text-gray-400">Manage your email communications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Email List */}
        <div className="lg:col-span-1 bg-gray-800 rounded-2xl overflow-hidden">
          {/* Mail Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Inbox</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            {/* Filters */}
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                  filter === 'unread' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Unread ({emails.filter(e => !e.read).length})
              </button>
              <button
                onClick={() => setFilter('starred')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                  filter === 'starred' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Starred ({emails.filter(e => e.starred).length})
              </button>
            </div>
          </div>

          {/* Email List */}
          <div className="overflow-y-auto h-full">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors duration-200 ${
                  selectedEmail?.id === email.id ? 'bg-gray-700' : ''
                } ${!email.read ? 'bg-blue-500/5' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={email.avatar}
                    alt={email.sender}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-sm font-medium truncate ${
                        email.read ? 'text-gray-300' : 'text-white'
                      }`}>
                        {email.sender}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(email.id);
                          }}
                          className={`p-1 rounded hover:bg-gray-600 transition-colors duration-200 ${
                            email.starred ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                          }`}
                        >
                          <Star className="h-3 w-3" fill={email.starred ? 'currentColor' : 'none'} />
                        </button>
                        <span className="text-xs text-gray-500">{email.time}</span>
                      </div>
                    </div>
                    <p className={`text-sm truncate mb-1 ${
                      email.read ? 'text-gray-400' : 'text-gray-300'
                    }`}>
                      {email.subject}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{email.preview}</p>
                    {!email.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Content */}
        <div className="lg:col-span-2 bg-gray-800 rounded-2xl overflow-hidden">
          {selectedEmail ? (
            <div className="h-full flex flex-col">
              {/* Email Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedEmail.avatar}
                      alt={selectedEmail.sender}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-white">{selectedEmail.sender}</h2>
                      <p className="text-sm text-gray-400">{selectedEmail.senderEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEmailAction('reply', selectedEmail.id)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      title="Reply"
                    >
                      <Reply className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEmailAction('forward', selectedEmail.id)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      title="Forward"
                    >
                      <Forward className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEmailAction('archive', selectedEmail.id)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      title="Archive"
                    >
                      <Archive className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEmailAction('delete', selectedEmail.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold text-white">{selectedEmail.subject}</h1>
                  <span className="text-sm text-gray-400">{selectedEmail.time}</span>
                </div>
              </div>

              {/* Email Body */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">
                    {selectedEmail.preview}
                  </p>
                  <br />
                  <p className="text-gray-300 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <br />
                  <p className="text-gray-300 leading-relaxed">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                    in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <br />
                  <p className="text-gray-300 leading-relaxed">
                    Best regards,<br />
                    {selectedEmail.sender}
                  </p>
                </div>
              </div>

              {/* Reply Section */}
              <div className="p-6 border-t border-gray-700">
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                    Reply
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                    Forward
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-lg font-medium text-white mb-2">Select an email</h3>
                <p className="text-gray-400">Choose an email from the list to read its content</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mail;