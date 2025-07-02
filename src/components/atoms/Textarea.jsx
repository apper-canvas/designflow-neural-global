import { forwardRef } from 'react'

const Textarea = forwardRef(({ 
  label, 
  error, 
  className = '', 
  rows = 3,
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
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          resize-vertical
          ${error ? 'border-error focus:ring-error/50 focus:border-error' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea