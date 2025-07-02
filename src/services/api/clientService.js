import clientsData from '@/services/mockData/clients.json'

class ClientService {
  constructor() {
    this.clients = [...clientsData]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.clients]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const client = this.clients.find(c => c.Id === id)
    if (!client) {
      throw new Error('Client not found')
    }
    return { ...client }
  }

  async create(clientData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const newId = Math.max(...this.clients.map(c => c.Id), 0) + 1
    const newClient = {
      Id: newId,
      ...clientData,
      createdAt: new Date().toISOString(),
      lastContact: null
    }
    this.clients.push(newClient)
    return { ...newClient }
  }

  async update(id, clientData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = this.clients.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error('Client not found')
    }
    this.clients[index] = { ...this.clients[index], ...clientData }
    return { ...this.clients[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250))
    const index = this.clients.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error('Client not found')
    }
    this.clients.splice(index, 1)
    return true
  }
}

export default new ClientService()