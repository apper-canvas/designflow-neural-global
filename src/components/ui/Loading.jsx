import { motion } from 'framer-motion'

const Loading = ({ type = 'default' }) => {
  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-lg shadow-card border border-gray-100 p-6"
          >
            <div className="animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }
  
  if (type === 'list') {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-lg shadow-card border border-gray-100 p-4"
          >
            <div className="animate-pulse flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }
  
  if (type === 'stats') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-lg shadow-card border border-gray-100 p-6"
          >
            <div className="animate-pulse flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }
  
  // Default loading
  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full"
      />
    </div>
  )
}

export default Loading