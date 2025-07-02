import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'

const StatusDropdown = ({ 
  currentStatus, 
  onStatusChange, 
  statuses = [],
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const statusVariants = {
    'lead': 'lead',
    'design': 'design', 
    'in-progress': 'progress',
    'complete': 'complete'
  }
  
  const handleStatusChange = (status) => {
    onStatusChange?.(status)
    setIsOpen(false)
  }
  
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <Badge variant={statusVariants[currentStatus?.toLowerCase()] || 'default'}>
          {currentStatus || 'Select Status'}
        </Badge>
        <ApperIcon name="ChevronDown" size={14} className="text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="py-1">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
              >
                <Badge variant={statusVariants[status?.toLowerCase()] || 'default'}>
                  {status}
                </Badge>
                {currentStatus === status && (
                  <ApperIcon name="Check" size={14} className="text-accent" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default StatusDropdown