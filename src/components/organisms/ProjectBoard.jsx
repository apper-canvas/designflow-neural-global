import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ProjectCard from '@/components/molecules/ProjectCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import projectService from '@/services/api/projectService'
import clientService from '@/services/api/clientService'

const ProjectBoard = () => {
  const [projects, setProjects] = useState([])
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [draggedProject, setDraggedProject] = useState(null)
  
  const columns = [
    { id: 'Lead', title: 'Lead', color: 'bg-blue-50 border-blue-200' },
    { id: 'Design', title: 'Design', color: 'bg-purple-50 border-purple-200' },
    { id: 'In Progress', title: 'In Progress', color: 'bg-orange-50 border-orange-200' },
    { id: 'Complete', title: 'Complete', color: 'bg-green-50 border-green-200' }
  ]
  
  useEffect(() => {
    loadData()
  }, [])
  
  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const [projectsData, clientsData] = await Promise.all([
        projectService.getAll(),
        clientService.getAll()
      ])
      setProjects(projectsData)
      setClients(clientsData)
    } catch (err) {
      setError('Failed to load projects')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleDragStart = (e, project) => {
    setDraggedProject(project)
    e.dataTransfer.effectAllowed = 'move'
  }
  
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }
  
  const handleDrop = async (e, newStatus) => {
    e.preventDefault()
    
    if (!draggedProject || draggedProject.status === newStatus) {
      setDraggedProject(null)
      return
    }
    
    try {
      const updatedProject = { ...draggedProject, status: newStatus }
      await projectService.update(draggedProject.Id, updatedProject)
      
      setProjects(prevProjects =>
        prevProjects.map(p =>
          p.Id === draggedProject.Id ? updatedProject : p
        )
      )
      
      toast.success(`Project moved to ${newStatus}`)
    } catch (err) {
      toast.error('Failed to update project status')
      console.error('Error updating project:', err)
    }
    
    setDraggedProject(null)
  }
  
  const getProjectsForColumn = (status) => {
    return projects.filter(project => project.status === status)
  }
  
  const getClientForProject = (clientId) => {
    return clients.find(client => client.Id === clientId)
  }
  
  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadData} />
  if (projects.length === 0) return <Empty title="No Projects Yet" description="Start by creating your first design project" />
  
  return (
    <div className="h-full overflow-x-auto">
      <div className="flex space-x-6 h-full min-w-max pb-6">
        {columns.map((column) => {
          const columnProjects = getProjectsForColumn(column.id)
          
          return (
            <div
              key={column.id}
              className="flex-shrink-0 w-80"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className={`bg-white rounded-lg border-2 border-dashed h-full ${column.color}`}>
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 flex items-center justify-between">
                    {column.title}
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                      {columnProjects.length}
                    </span>
                  </h3>
                </div>
                
                <div className="p-4 space-y-4 h-full overflow-y-auto">
                  {columnProjects.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">No projects in {column.title.toLowerCase()}</p>
                    </div>
                  ) : (
                    columnProjects.map((project) => (
                      <div
                        key={project.Id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, project)}
                        className="cursor-move"
                      >
                        <ProjectCard
                          project={project}
                          client={getClientForProject(project.clientId)}
                          isDragging={draggedProject?.Id === project.Id}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectBoard