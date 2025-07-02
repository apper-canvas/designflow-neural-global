import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import Card from '@/components/atoms/Card'
import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const ClientCard = ({ client }) => {
  const navigate = useNavigate()
  
  const handleViewClient = () => {
    navigate(`/clients/${client.Id}`)
  }
  
  return (
    <Card hover className="cursor-pointer" onClick={handleViewClient}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Avatar name={client.name} size="lg" />
          <div>
            <h3 className="font-semibold text-gray-900">{client.name}</h3>
            <p className="text-sm text-gray-600">{client.email}</p>
            <p className="text-sm text-gray-500">{client.phone}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Last Contact</p>
          <p className="text-sm font-medium text-gray-900">
            {client.lastContact ? format(new Date(client.lastContact), 'MMM dd, yyyy') : 'Never'}
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <ApperIcon name="MapPin" size={14} />
              <span>{client.address || 'No address'}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon="ArrowRight"
            iconPosition="right"
            onClick={(e) => {
              e.stopPropagation()
              handleViewClient()
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ClientCard