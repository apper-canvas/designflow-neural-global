import { useState, useEffect } from 'react'
import StatsCard from '@/components/molecules/StatsCard'
import ProjectCard from '@/components/molecules/ProjectCard'
import ClientCard from '@/components/molecules/ClientCard'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import projectService from '@/services/api/projectService'
import clientService from '@/services/api/clientService'
import meetingService from '@/services/api/meetingService'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalClients: 0,
    upcomingMeetings: 0
  })
  const [recentProjects, setRecentProjects] = useState([])
  const [recentClients, setRecentClients] = useState([])
  const [upcomingMeetings, setUpcomingMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    loadDashboardData()
  }, [])
  
  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [projects, clients, meetings] = await Promise.all([
        projectService.getAll(),
        clientService.getAll(),
        meetingService.getAll()
      ])
      
      // Calculate stats
      const activeProjects = projects.filter(p => p.status !== 'Complete').length
      const today = new Date()
      const upcomingMeetingsCount = meetings.filter(m => 
        new Date(m.date) >= today
      ).length
      
      setStats({
        totalProjects: projects.length,
        activeProjects,
        totalClients: clients.length,
        upcomingMeetings: upcomingMeetingsCount
      })
      
      // Get recent data
      setRecentProjects(projects.slice(0, 6))
      setRecentClients(clients.slice(0, 6))
      setUpcomingMeetings(meetings
        .filter(m => new Date(m.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5)
      )
    } catch (err) {
      setError('Failed to load dashboard data')
      console.error('Error loading dashboard:', err)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) return <Loading type="stats" />
  if (error) return <Error message={error} onRetry={loadDashboardData} />
  
  return (
    <div className="p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projects"
          value={stats.totalProjects}
          icon="FolderOpen"
          color="accent"
        />
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          icon="Clock"
          color="warning"
        />
        <StatsCard
          title="Total Clients"
          value={stats.totalClients}
          icon="Users"
          color="success"
        />
        <StatsCard
          title="Upcoming Meetings"
          value={stats.upcomingMeetings}
          icon="Calendar"
          color="info"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
            <Button variant="ghost" size="sm" icon="ArrowRight">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentProjects.length === 0 ? (
              <Card>
                <div className="text-center py-8">
                  <p className="text-gray-500">No projects yet</p>
                  <Button className="mt-4" icon="Plus">
                    Create First Project
                  </Button>
                </div>
              </Card>
            ) : (
              recentProjects.slice(0, 3).map((project) => {
                const client = recentClients.find(c => c.Id === project.clientId)
                return (
                  <ProjectCard
                    key={project.Id}
                    project={project}
                    client={client}
                  />
                )
              })
            )}
          </div>
        </div>
        
        {/* Upcoming Meetings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Meetings</h2>
            <Button variant="ghost" size="sm" icon="ArrowRight">
              View Calendar
            </Button>
          </div>
          <Card>
            {upcomingMeetings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No upcoming meetings</p>
                <Button className="mt-4" icon="Plus">
                  Schedule Meeting
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => {
                  const client = recentClients.find(c => c.Id === meeting.clientId)
                  return (
                    <div key={meeting.Id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{client?.name || 'Unknown Client'}</p>
                        <p className="text-sm text-gray-600">{meeting.notes}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(meeting.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard