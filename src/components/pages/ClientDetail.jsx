import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import clientService from '@/services/api/clientService'
import projectService from '@/services/api/projectService'
import meetingService from '@/services/api/meetingService'

const ClientDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState(null)
  const [projects, setProjects] = useState([])
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  
  useEffect(() => {
    if (id) {
      loadClientData()
    }
  }, [id])
  
  const loadClientData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [clientData, allProjects, allMeetings] = await Promise.all([
        clientService.getById(parseInt(id)),
        projectService.getAll(),
        meetingService.getAll()
      ])
      
      setClient(clientData)
      setProjects(allProjects.filter(p => p.clientId === parseInt(id)))
      setMeetings(allMeetings.filter(m => m.clientId === parseInt(id)))
    } catch (err) {
      setError('Failed to load client details')
      console.error('Error loading client:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleEditClient = () => {
    toast.info('Edit client functionality would be implemented here')
  }
  
  const handleDeleteClient = () => {
    toast.info('Delete client functionality would be implemented here')
  }
  
  const handleNewProject = () => {
    toast.info('New project functionality would be implemented here')
  }
  
  const handleScheduleMeeting = () => {
    toast.info('Schedule meeting functionality would be implemented here')
  }
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadClientData} />
  if (!client) return <Error message="Client not found" />
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'projects', label: 'Projects', icon: 'FolderOpen' },
    { id: 'meetings', label: 'Meetings', icon: 'Calendar' },
    { id: 'communications', label: 'Communications', icon: 'MessageSquare' }
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
            onClick={() => navigate('/clients')}
          >
            Back to Clients
          </Button>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon="Edit" onClick={handleEditClient}>
            Edit Client
          </Button>
          <Button variant="danger" icon="Trash2" onClick={handleDeleteClient}>
            Delete
          </Button>
        </div>
      </div>
      
      {/* Client Header */}
      <Card>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar name={client.name} size="xl" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
              <p className="text-gray-600">{client.email}</p>
              <p className="text-gray-600">{client.phone}</p>
              <p className="text-sm text-gray-500 mt-1">{client.address}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Client since</p>
            <p className="font-medium">
              {format(new Date(client.createdAt), 'MMM dd, yyyy')}
            </p>
            <p className="text-sm text-gray-500 mt-2">Last contact</p>
            <p className="font-medium">
              {client.lastContact ? format(new Date(client.lastContact), 'MMM dd, yyyy') : 'Never'}
            </p>
          </div>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Notes</label>
                    <p className="mt-1 text-gray-900">{client.notes || 'No notes available'}</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Projects</span>
                    <span className="font-semibold">{projects.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Projects</span>
                    <span className="font-semibold">
                      {projects.filter(p => p.status !== 'Complete').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Meetings</span>
                    <span className="font-semibold">{meetings.length}</span>
                  </div>
                </div>
              </Card>
              
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full" icon="Plus" onClick={handleNewProject}>
                    New Project
                  </Button>
                  <Button className="w-full" variant="outline" icon="Calendar" onClick={handleScheduleMeeting}>
                    Schedule Meeting
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
        
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Projects ({projects.length})</h3>
              <Button icon="Plus" onClick={handleNewProject}>
                New Project
              </Button>
            </div>
            
            {projects.length === 0 ? (
              <Card>
                <div className="text-center py-8">
                  <ApperIcon name="FolderOpen" size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No projects yet</p>
                  <Button icon="Plus" onClick={handleNewProject}>
                    Create First Project
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.Id} hover className="cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant={statusVariants[project.status?.toLowerCase()] || 'default'}>
                            {project.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Budget: ${project.budget?.toLocaleString() || '0'}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="ArrowRight"
                        onClick={() => navigate(`/projects/${project.Id}`)}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'meetings' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Meetings ({meetings.length})</h3>
              <Button icon="Plus" onClick={handleScheduleMeeting}>
                Schedule Meeting
              </Button>
            </div>
            
            {meetings.length === 0 ? (
              <Card>
                <div className="text-center py-8">
                  <ApperIcon name="Calendar" size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No meetings scheduled</p>
                  <Button icon="Plus" onClick={handleScheduleMeeting}>
                    Schedule First Meeting
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <Card key={meeting.Id}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <ApperIcon name="Calendar" size={16} className="text-accent" />
                          <span className="font-medium text-gray-900">
                            {format(new Date(meeting.date), 'MMM dd, yyyy')} at{' '}
                            {format(new Date(meeting.date), 'h:mm a')}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{meeting.notes}</p>
                        {meeting.followUp && (
                          <p className="text-sm text-gray-500">
                            Follow-up: {meeting.followUp}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'communications' && (
          <Card>
            <div className="text-center py-8">
              <ApperIcon name="MessageSquare" size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Communication history feature coming soon</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ClientDetail