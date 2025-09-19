import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Database, Save, Eye, EyeOff } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Profile settings
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Senior Software Developer with 5+ years of experience',
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: false,
    marketingEmails: false,
    
    // Security settings
    twoFactorAuth: false,
    loginAlerts: true,
    
    // Appearance settings
    theme: 'dark',
    language: 'en',
    timezone: 'UTC-5',
    
    // Data settings
    dataExport: false,
    analytics: true,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Implement save logic here
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data & Privacy', icon: Database },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    value={settings.firstName}
                    onChange={(e) => handleSettingChange('firstName', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={settings.lastName}
                    onChange={(e) => handleSettingChange('lastName', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => handleSettingChange('phone', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea
                  value={settings.bio}
                  onChange={(e) => handleSettingChange('bio', e.target.value)}
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                  { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive push notifications in browser' },
                  { key: 'weeklyReports', label: 'Weekly Reports', description: 'Get weekly performance reports' },
                  { key: 'marketingEmails', label: 'Marketing Emails', description: 'Receive promotional content and updates' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">{item.label}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[item.key as keyof typeof settings] as boolean}
                        onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Change Password</h4>
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Current password"
                        className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <input
                      type="password"
                      placeholder="New password"
                      className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                      Update Password
                    </button>
                  </div>
                </div>

                {[
                  { key: 'twoFactorAuth', label: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account' },
                  { key: 'loginAlerts', label: 'Login Alerts', description: 'Get notified when someone logs into your account' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">{item.label}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[item.key as keyof typeof settings] as boolean}
                        onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Appearance & Localization</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleSettingChange('theme', e.target.value)}
                    className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div className="p-4 bg-gray-700 rounded-lg">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div className="p-4 bg-gray-700 rounded-lg">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleSettingChange('timezone', e.target.value)}
                    className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">GMT (UTC+0)</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Data & Privacy</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Data Export</h4>
                  <p className="text-sm text-gray-400 mb-3">Download a copy of your data</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                    Request Data Export
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Analytics Collection</h4>
                    <p className="text-sm text-gray-400">Help us improve by sharing usage analytics</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.analytics}
                      onChange={(e) => handleSettingChange('analytics', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <h4 className="text-red-400 font-medium mb-2">Danger Zone</h4>
                  <p className="text-sm text-gray-400 mb-3">Permanently delete your account and all data</p>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account preferences and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 bg-gray-800 rounded-2xl p-6">
          {renderTabContent()}
          
          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;