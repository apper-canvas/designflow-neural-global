import projectsData from '@/services/mockData/projects.json'

class ProjectService {
  constructor() {
    this.projects = [...projectsData]
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 350))
    return [...this.projects]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const project = this.projects.find(p => p.Id === id)
    if (!project) {
      throw new Error('Project not found')
    }
    return { ...project }
  }

  async create(projectData) {
    await new Promise(resolve => setTimeout(resolve, 450))
    const newId = Math.max(...this.projects.map(p => p.Id), 0) + 1
    const newProject = {
      Id: newId,
      ...projectData,
      images: projectData.images || []
    }
    this.projects.push(newProject)
    return { ...newProject }
  }

  async update(id, projectData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = this.projects.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Project not found')
    }
    this.projects[index] = { ...this.projects[index], ...projectData }
    return { ...this.projects[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250))
    const index = this.projects.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Project not found')
    }
    this.projects.splice(index, 1)
    return true
  }

  async getByClientId(clientId) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.projects.filter(p => p.clientId === clientId)
  }

  async getByStatus(status) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.projects.filter(p => p.status === status)
  }
}

export default new ProjectService()