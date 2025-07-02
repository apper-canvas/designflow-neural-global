import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import projectService from '@/services/api/projectService'
import clientService from '@/services/api/clientService'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  
  useEffect(() => {
    if (id) {
      loadProjectData()
    }
  }, [id])
  
  const loadProjectData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const projectData = await projectService.getById(parseInt(id))
      setProject(projectData)
      
      if (projectData.clientId) {
        const clientData = await clientService.getById(projectData.clientId)
        setClient(clientData)
      }
    } catch (err) {
      setError('Failed to load project details')
      console.error('Error loading project:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleEditProject = () => {
    toast.info('Edit project functionality would be implemented here')
  }
  
  const handleDeleteProject = () => {
    toast.info('Delete project functionality would be implemented here')
  }
  
  const handleStatusChange = () => {
    toast.info('Status change functionality would be implemented here')
  }
  
  const handleAddImage = () => {
    toast.info('Add image functionality would be implemented here')
  }
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadProjectData} />
  if (!project) return <Error message="Project not found" />
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'images', label: 'Images', icon: 'Image' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'budget', label: 'Budget', icon: 'DollarSign' }
  ]
  
  const statusVariants = {
    'lead': 'lead',
    'design': 'design',
    'in-progress': 'progress',
    'complete': 'complete'
  }
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            icon="ArrowLeft"
            onClick={() => navigate('/projects')}
          >
            Back to Projects
          </Button>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon="Edit" onClick={handleEditProject}>
            Edit Project
          </Button>
          <Button variant="danger" icon="Trash2" onClick={handleDeleteProject}>
            Delete
          </Button>
        </div>
      </div>
      
      {/* Project Header */}
      <Card>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <Badge variant={statusVariants[project.status?.toLowerCase()] || 'default'}>
                {project.status}
              </Badge>
            </div>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <ApperIcon name="User" size={16} />
                <span>{client?.name || 'Unknown Client'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="DollarSign" size={16} />
                <span>${project.budget?.toLocaleString() || '0'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Calendar" size={16} />
                <span>
                  {project.startDate ? format(new Date(project.startDate), 'MMM dd, yyyy') : 'No start date'}
                </span>
              </div>
            </div>
          </div>
          <Button icon="Edit" onClick={handleStatusChange}>
            Change Status
          </Button>
        </div>
      </Card>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ApperIcon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Description</label>
                    <p className="mt-1 text-gray-900">{project.description || 'No description available'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Start Date</label>
                      <p className="mt-1 text-gray-900">
                        {project.startDate ? format(new Date(project.startDate), 'MMM dd, yyyy') : 'Not set'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">End Date</label>
                      <p className="mt-1 text-gray-900">
                        {project.endDate ? format(new Date(project.endDate), 'MMM dd, yyyy') : 'Not set'}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              
              {client && (
                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-gray-600">{client.email}</p>
                      <p className="text-gray-600">{client.phone}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/clients/${client.Id}`)}
                    >
                      View Client
                    </Button>
                  </div>
                </Card>
              )}
            </div>
            
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Status</span>
                    <Badge variant={statusVariants[project.status?.toLowerCase()] || 'default'}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-semibold">${project.budget?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Images</span>
                    <span className="font-semibold">{project.images?.length || 0}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
        
        {activeTab === 'images' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Project Images ({project.images?.length || 0})
              </h3>
              <Button icon="Plus" onClick={handleAddImage}>
                Add Images
              </Button>
            </div>
            
            {!project.images || project.images.length === 0 ? (
              <Card>
                <div className="text-center py-8">
                  <ApperIcon name="Image" size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No images uploaded yet</p>
                  <Button icon="Plus" onClick={handleAddImage}>
                    Upload First Image
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                  <Card key={index} padding="none" className="overflow-hidden">
                    <img
                      src={image}
                      alt={`Project image ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'timeline' && (
          <Card>
            <div className="text-center py-8">
              <ApperIcon name="Clock" size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Project timeline feature coming soon</p>
            </div>
          </Card>
        )}
        
        {activeTab === 'budget' && (
          <Card>
            <div className="text-center py-8">
              <ApperIcon name="DollarSign" size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Budget tracking feature coming soon</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ProjectDetail