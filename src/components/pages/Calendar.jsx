import { useState, useEffect } from 'react'
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import meetingService from '@/services/api/meetingService'
import clientService from '@/services/api/clientService'

const Calendar = () => {
  const [meetings, setMeetings] = useState([])
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('month') // month, week, day
  
  useEffect(() => {
    loadCalendarData()
  }, [])
  
  const loadCalendarData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [meetingsData, clientsData] = await Promise.all([
        meetingService.getAll(),
        clientService.getAll()
      ])
      
      setMeetings(meetingsData)
      setClients(clientsData)
    } catch (err) {
      setError('Failed to load calendar data')
      console.error('Error loading calendar:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const getClientName = (clientId) => {
    const client = clients.find(c => c.Id === clientId)
    return client?.name || 'Unknown Client'
  }
  
  const getMeetingsForDate = (date) => {
    return meetings.filter(meeting => 
      isSameDay(new Date(meeting.date), date)
    )
  }
  
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate)
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + direction)
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction * 7))
    } else {
      newDate.setDate(newDate.getDate() + direction)
    }
    setCurrentDate(newDate)
  }
  
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const calendarStart = startOfWeek(monthStart)
    const calendarEnd = endOfWeek(monthEnd)
    
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    return (
      <Card>
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {/* Weekday headers */}
          {weekdays.map(day => (
            <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map(day => {
            const dayMeetings = getMeetingsForDate(day)
            const isCurrentMonth = isSameMonth(day, currentDate)
            const isDayToday = isToday(day)
            
            return (
              <div
                key={day.toISOString()}
                className={`bg-white p-2 min-h-24 ${
                  isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                } ${isDayToday ? 'bg-accent/5' : ''}`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isDayToday ? 'text-accent' : ''
                }`}>
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayMeetings.slice(0, 2).map(meeting => (
                    <div
                      key={meeting.Id}
                      className="text-xs bg-accent/10 text-accent rounded px-2 py-1 truncate"
                    >
                      {format(new Date(meeting.date), 'HH:mm')} - {getClientName(meeting.clientId)}
                    </div>
                  ))}
                  {dayMeetings.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayMeetings.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    )
  }
  
  const renderUpcomingMeetings = () => {
    const upcomingMeetings = meetings
      .filter(meeting => new Date(meeting.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5)
    
    return (
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meetings</h3>
        {upcomingMeetings.length === 0 ? (
          <div className="text-center py-8">
            <ApperIcon name="Calendar" size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No upcoming meetings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingMeetings.map(meeting => (
              <div key={meeting.Id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Calendar" size={16} className="text-accent" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{getClientName(meeting.clientId)}</h4>
                    <span className="text-sm text-gray-500">
                      {format(new Date(meeting.date), 'MMM dd, h:mm a')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{meeting.notes}</p>
                  {meeting.followUp && (
                    <p className="text-xs text-gray-500 mt-1">Follow-up: {meeting.followUp}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    )
  }
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadCalendarData} />
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              icon="ChevronLeft"
              onClick={() => navigateDate(-1)}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon="ChevronRight"
              onClick={() => navigateDate(1)}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            {['month', 'week', 'day'].map(viewType => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  view === viewType
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </button>
            ))}
          </div>
          <Button icon="Plus">
            New Meeting
          </Button>
        </div>
      </div>
      
      {/* Calendar Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {view === 'month' && renderMonthView()}
          {view === 'week' && (
            <Card>
              <div className="text-center py-8">
                <p className="text-gray-500">Week view coming soon</p>
              </div>
            </Card>
          )}
          {view === 'day' && (
            <Card>
              <div className="text-center py-8">
                <p className="text-gray-500">Day view coming soon</p>
              </div>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          {renderUpcomingMeetings()}
          
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full" variant="outline" icon="Plus">
                Schedule Meeting
              </Button>
              <Button className="w-full" variant="outline" icon="Users">
                View Clients
              </Button>
              <Button className="w-full" variant="outline" icon="FolderOpen">
                View Projects
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Calendar