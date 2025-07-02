import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'md',
  ...props 
}) => {
  const baseClasses = 'bg-surface rounded-lg shadow-card border border-gray-100'
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const cardClasses = `${baseClasses} ${paddings[padding]} ${className}`
  
  if (hover) {
    return (
      <motion.div
        whileHover={{ 
          scale: 1.02, 
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)' 
        }}
        transition={{ duration: 0.2 }}
        className={cardClasses}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  )
}

export default Card