import { useState } from 'react'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [settings, setSettings] = useState({
    name: 'Sarah Johnson',
    email: 'sarah@designstudio.com',
    phone: '(555) 123-4567',
    company: 'Johnson Interior Design',
    timezone: 'America/New_York',
    dateFormat: 'MM/dd/yyyy',
    currency: 'USD',
    notifications: {
      email: true,
      browser: true,
      meetings: true,
      projects: false
    }
  })
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'preferences', label: 'Preferences', icon: 'Settings' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'security', label: 'Security', icon: 'Shield' }
  ]
  
  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  const handleNotificationChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }))
  }
  
  const handleSave = () => {
    console.log('Settings saved:', settings)
    // Here you would typically save to backend
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <Button onClick={handleSave} icon="Save">
          Save Changes
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-accent/10 text-accent'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ApperIcon name={tab.icon} size={16} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>
        
        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
                    <ApperIcon name="User" className="text-white" size={32} />
                  </div>
                  <div>
                    <Button variant="outline" icon="Upload">
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    value={settings.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  <Input
                    label="Phone Number"
                    value={settings.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                  <Input
                    label="Company Name"
                    value={settings.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>
              </div>
            </Card>
          )}
          
          {activeTab === 'preferences' && (
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Preferences</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Timezone"
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </Select>
                  
                  <Select
                    label="Date Format"
                    value={settings.dateFormat}
                    onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                  >
                    <option value="MM/dd/yyyy">MM/DD/YYYY</option>
                    <option value="dd/MM/yyyy">DD/MM/YYYY</option>
                    <option value="yyyy-MM-dd">YYYY-MM-DD</option>
                  </Select>
                  
                  <Select
                    label="Currency"
                    value={settings.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                  >
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                    <option value="CAD">Canadian Dollar (C$)</option>
                  </Select>
                </div>
              </div>
            </Card>
          )}
          
          {activeTab === 'notifications' && (
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.email}
                        onChange={(e) => handleNotificationChange('email', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Browser Notifications</h3>
                      <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.browser}
                        onChange={(e) => handleNotificationChange('browser', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Meeting Reminders</h3>
                      <p className="text-sm text-gray-500">Get reminded about upcoming meetings</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.meetings}
                        onChange={(e) => handleNotificationChange('meetings', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Project Updates</h3>
                      <p className="text-sm text-gray-500">Get notified when project status changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.projects}
                        onChange={(e) => handleNotificationChange('projects', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {activeTab === 'security' && (
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Password</h3>
                      <p className="text-sm text-gray-500">Last changed 2 months ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable 2FA
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Active Sessions</h3>
                      <p className="text-sm text-gray-500">Manage your active sessions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Sessions
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Data Export</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Export all your data including clients, projects, and meetings
                  </p>
                  <Button variant="outline" icon="Download">
                    Export Data
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings