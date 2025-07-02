import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const ProjectCard = ({ project, client, onStatusChange, isDragging = false }) => {
  const navigate = useNavigate()
  
  const statusVariants = {
    'lead': 'lead',
    'design': 'design',
    'in-progress': 'progress', 
    'complete': 'complete'
  }
  
  const handleViewProject = () => {
    navigate(`/projects/${project.Id}`)
  }
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={!isDragging ? { scale: 1.02 } : {}}
      className={`cursor-pointer ${isDragging ? 'rotate-2 z-50' : ''}`}
    >
      <Card 
        className={`${isDragging ? 'shadow-2xl border-accent' : 'hover:shadow-hover'} transition-all duration-200`}
        onClick={handleViewProject}
      >
        {project.images?.length > 0 && (
          <div className="mb-4 -mx-6 -mt-6">
            <img
              src={project.images[0]}
              alt={project.name}
              className="w-full h-32 object-cover rounded-t-lg"
            />
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{client?.name}</p>
              <Badge variant={statusVariants[project.status?.toLowerCase()] || 'default'}>
                {project.status}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Budget:</span>
              <span className="font-medium">${project.budget?.toLocaleString() || '0'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Start Date:</span>
              <span>{project.startDate ? format(new Date(project.startDate), 'MMM dd, yyyy') : 'Not set'}</span>
            </div>
          </div>
          
          {project.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
          )}
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              {project.images?.length > 0 && (
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <ApperIcon name="Image" size={12} />
                  <span>{project.images.length}</span>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon="ArrowRight"
              iconPosition="right"
              onClick={(e) => {
                e.stopPropagation()
                handleViewProject()
              }}
            >
              View
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default ProjectCard