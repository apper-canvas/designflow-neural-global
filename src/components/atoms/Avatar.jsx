import ApperIcon from '@/components/ApperIcon'

const Avatar = ({ src, name, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  }
  
  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  const baseClasses = `${sizes[size]} rounded-full flex items-center justify-center font-medium ${className}`
  
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${baseClasses} object-cover`}
      />
    )
  }
  
  return (
    <div className={`${baseClasses} bg-gradient-to-br from-accent to-accent/80 text-white`}>
      {name ? getInitials(name) : <ApperIcon name="User" size={size === 'sm' ? 14 : size === 'lg' ? 20 : size === 'xl' ? 24 : 16} />}
    </div>
  )
}

export default Avatar