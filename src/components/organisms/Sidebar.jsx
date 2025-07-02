import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Sidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Clients', href: '/clients', icon: 'Users' },
    { name: 'Projects', href: '/projects', icon: 'FolderOpen' },
    { name: 'Calendar', href: '/calendar', icon: 'Calendar' },
    { name: 'Settings', href: '/settings', icon: 'Settings' },
  ]
  
  // Desktop Sidebar - Static positioning
  const DesktopSidebar = () => (
    <div className="hidden lg:block w-64 bg-white border-r border-gray-200 h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
              <ApperIcon name="Palette" className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-display font-semibold text-gray-900">DesignFlow</h1>
              <p className="text-xs text-gray-500">CRM</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-accent/10 text-accent border-r-2 border-accent'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <ApperIcon name={item.icon} className="mr-3" size={18} />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-1">Upgrade to Pro</h3>
            <p className="text-xs text-gray-600 mb-3">Get unlimited projects and advanced features</p>
            <button className="w-full bg-accent text-white text-xs font-medium py-2 px-3 rounded-md hover:bg-accent/90 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
  
  // Mobile Sidebar - Overlay with transforms
  const MobileSidebar = () => (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}
      
      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="lg:hidden fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200 z-50"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
                <ApperIcon name="Palette" className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-display font-semibold text-gray-900">DesignFlow</h1>
                <p className="text-xs text-gray-500">CRM</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <ApperIcon name="X" size={20} className="text-gray-500" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? 'bg-accent/10 text-accent border-r-2 border-accent'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <ApperIcon name={item.icon} className="mr-3" size={18} />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-1">Upgrade to Pro</h3>
              <p className="text-xs text-gray-600 mb-3">Get unlimited projects and advanced features</p>
              <button className="w-full bg-accent text-white text-xs font-medium py-2 px-3 rounded-md hover:bg-accent/90 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
  
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}

export default Sidebar