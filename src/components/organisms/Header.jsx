import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'
import ApperIcon from '@/components/ApperIcon'

const Header = ({ onMobileMenuToggle }) => {
  const [notifications] = useState(3)
  const location = useLocation()
  
  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/' || path === '/dashboard') return 'Dashboard'
    if (path === '/clients') return 'Clients'
    if (path === '/projects') return 'Projects'
    if (path === '/calendar') return 'Calendar'
    if (path === '/settings') return 'Settings'
    if (path.startsWith('/clients/')) return 'Client Details'
    if (path.startsWith('/projects/')) return 'Project Details'
    return 'DesignFlow CRM'
  }
  
  const handleSearch = (query) => {
    console.log('Search:', query)
  }
  
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            icon="Menu"
            onClick={onMobileMenuToggle}
            className="lg:hidden"
          />
          <div>
            <h1 className="text-2xl font-display font-semibold text-gray-900">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search clients, projects..."
              className="w-80"
            />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="relative md:hidden"
          >
            <ApperIcon name="Search" size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="relative"
          >
            <ApperIcon name="Bell" size={20} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>
          
          <div className="flex items-center space-x-3">
            <Avatar name="Sarah Johnson" size="md" />
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Interior Designer</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header