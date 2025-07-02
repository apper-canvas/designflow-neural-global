const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium'
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    info: 'bg-info/10 text-info',
    lead: 'bg-blue-100 text-blue-800',
    design: 'bg-purple-100 text-purple-800',
    progress: 'bg-orange-100 text-orange-800',
    complete: 'bg-green-100 text-green-800'
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-sm'
  }
  
  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge