import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No data found", 
  description = "Get started by adding your first item",
  action,
  actionLabel = "Add New",
  icon = "Plus",
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-center py-12 ${className}`}
    >
      <Card className="text-center max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-accent/20 rounded-full flex items-center justify-center">
            <ApperIcon name={icon} className="text-accent" size={36} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
          {action && (
            <Button onClick={action} icon={icon} className="mt-4">
              {actionLabel}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

export default Empty