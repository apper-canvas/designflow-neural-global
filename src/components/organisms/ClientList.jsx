import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '@/components/molecules/SearchBar'
import ClientCard from '@/components/molecules/ClientCard'
import Button from '@/components/atoms/Button'
import Select from '@/components/atoms/Select'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import clientService from '@/services/api/clientService'

const ClientList = () => {
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const navigate = useNavigate()
  
  useEffect(() => {
    loadClients()
  }, [])
  
  useEffect(() => {
    filterAndSortClients()
  }, [clients, searchQuery, sortBy])
  
  const loadClients = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await clientService.getAll()
      setClients(data)
    } catch (err) {
      setError('Failed to load clients')
      console.error('Error loading clients:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const filterAndSortClients = () => {
    let filtered = clients
    
    if (searchQuery) {
      filtered = clients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone.includes(searchQuery)
      )
    }
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'email':
          return a.email.localeCompare(b.email)
        case 'lastContact':
          return new Date(b.lastContact || 0) - new Date(a.lastContact || 0)
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt)
        default:
          return 0
      }
    })
    
    setFilteredClients(filtered)
  }
  
  const handleSearch = (query) => {
    setSearchQuery(query)
  }
  
  const handleAddClient = () => {
    navigate('/clients/new')
  }
  
  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadClients} />
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search clients..."
            className="flex-1 max-w-md"
          />
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-48"
          >
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="lastContact">Sort by Last Contact</option>
            <option value="created">Sort by Created Date</option>
          </Select>
        </div>
        <Button onClick={handleAddClient} icon="Plus">
          Add Client
        </Button>
      </div>
      
      {filteredClients.length === 0 ? (
        searchQuery ? (
          <Empty
            title="No clients found"
            description={`No clients match "${searchQuery}". Try a different search term.`}
            icon="Search"
          />
        ) : (
          <Empty
            title="No Clients Yet"
            description="Start building your client base by adding your first client"
            action={handleAddClient}
            actionLabel="Add First Client"
            icon="UserPlus"
          />
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <ClientCard key={client.Id} client={client} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ClientList