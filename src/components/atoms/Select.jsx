import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Select = forwardRef(({ 
  label, 
  error, 
  children, 
  className = '', 
  required = false,
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            appearance-none bg-white pr-10
            ${error ? 'border-error focus:ring-error/50 focus:border-error' : ''}
            ${className}
          `}
          {...props}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ApperIcon name="ChevronDown" className="text-gray-400" size={16} />
        </div>
      </div>
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select