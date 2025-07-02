import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue,
  color = 'accent',
  className = '' 
}) => {
  const colors = {
    accent: 'text-accent bg-accent/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    error: 'text-error bg-error/10',
    info: 'text-info bg-info/10'
  }
  
  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-gray-500'
  }
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={className}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && trendValue && (
              <div className={`flex items-center space-x-1 mt-2 text-sm ${trendColors[trend]}`}>
                <ApperIcon 
                  name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
                  size={14} 
                />
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colors[color]}`}>
            <ApperIcon name={icon} size={24} />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default StatsCard