import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  type = 'default',
  className = '' 
}) => {
  if (type === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 bg-error/5 border border-error/20 rounded-lg ${className}`}
      >
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <ApperIcon name="AlertCircle" className="text-error" size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-error">{message}</p>
          </div>
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry}>
              Retry
            </Button>
          )}
        </div>
      </motion.div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center justify-center py-12 ${className}`}
    >
      <Card className="text-center max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-error/10 to-error/20 rounded-full flex items-center justify-center">
            <ApperIcon name="AlertTriangle" className="text-error" size={32} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-6">{message}</p>
          </div>
          {onRetry && (
            <Button onClick={onRetry} icon="RefreshCw">
              Try Again
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

export default Error