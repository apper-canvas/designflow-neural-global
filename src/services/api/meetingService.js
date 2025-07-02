import meetingsData from '@/services/mockData/meetings.json'

class MeetingService {
  constructor() {
    this.meetings = [...meetingsData]
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 250))
    return [...this.meetings]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const meeting = this.meetings.find(m => m.Id === id)
    if (!meeting) {
      throw new Error('Meeting not found')
    }
    return { ...meeting }
  }

  async create(meetingData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const newId = Math.max(...this.meetings.map(m => m.Id), 0) + 1
    const newMeeting = {
      Id: newId,
      ...meetingData
    }
    this.meetings.push(newMeeting)
    return { ...newMeeting }
  }

  async update(id, meetingData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = this.meetings.findIndex(m => m.Id === id)
    if (index === -1) {
      throw new Error('Meeting not found')
    }
    this.meetings[index] = { ...this.meetings[index], ...meetingData }
    return { ...this.meetings[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250))
    const index = this.meetings.findIndex(m => m.Id === id)
    if (index === -1) {
      throw new Error('Meeting not found')
    }
    this.meetings.splice(index, 1)
    return true
  }

  async getByClientId(clientId) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.meetings.filter(m => m.clientId === clientId)
  }

  async getByProjectId(projectId) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.meetings.filter(m => m.projectId === projectId)
  }

  async getUpcoming() {
    await new Promise(resolve => setTimeout(resolve, 200))
    const now = new Date()
    return this.meetings
      .filter(m => new Date(m.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }
}

export default new MeetingService()