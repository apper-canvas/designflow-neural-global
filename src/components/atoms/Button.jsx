import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-gradient-to-r from-accent to-accent/90 text-white hover:from-accent/90 hover:to-accent shadow-md hover:shadow-lg focus:ring-accent/50',
    secondary: 'bg-secondary text-primary hover:bg-secondary/80 border border-secondary/50 focus:ring-secondary/50',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-200',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-200',
    danger: 'bg-gradient-to-r from-error to-error/90 text-white hover:from-error/90 hover:to-error shadow-md hover:shadow-lg focus:ring-error/50'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  }
  
  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" className="mr-2 animate-spin" size={iconSizes[size]} />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon name={icon} className="mr-2" size={iconSizes[size]} />
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon name={icon} className="ml-2" size={iconSizes[size]} />
      )}
    </motion.button>
  )
}

export default Button